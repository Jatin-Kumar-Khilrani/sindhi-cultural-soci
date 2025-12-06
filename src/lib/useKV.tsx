import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { getValue, setValue as setStorageValue } from './azure-storage';

// Cache for storing values locally to reduce API calls
const cache: Map<string, unknown> = new Map();
const subscribers: Map<string, Set<(value: unknown) => void>> = new Map();

// Context for KV Provider
interface KVContextType {
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
}

const KVContext = createContext<KVContextType>({
  isLoading: true,
  isConnected: false,
  error: null
});

export function KVProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test connection on mount
    const testConnection = async () => {
      try {
        const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT;
        if (!endpoint) {
          setError('Azure Cosmos DB endpoint not configured');
          setIsLoading(false);
          return;
        }
        
        // Try to get a test value to verify connection
        await getValue('_connection_test');
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setError('Failed to connect to Azure Cosmos DB');
        console.error('KV Connection error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <KVContext.Provider value={{ isLoading, isConnected, error }}>
      {children}
    </KVContext.Provider>
  );
}

export function useKVStatus() {
  return useContext(KVContext);
}

/**
 * useKV hook - Key-Value storage with Azure Cosmos DB backend
 * Provides reactive state management with cloud persistence
 */
export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((current: T) => T)) => void] {
  const [value, setLocalValue] = useState<T>(() => {
    // Check cache first
    if (cache.has(key)) {
      return cache.get(key) as T;
    }
    return defaultValue;
  });

  // Subscribe to updates for this key
  useEffect(() => {
    const handleUpdate = (newValue: unknown) => {
      setLocalValue(newValue as T);
    };

    if (!subscribers.has(key)) {
      subscribers.set(key, new Set());
    }
    subscribers.get(key)!.add(handleUpdate);

    return () => {
      subscribers.get(key)?.delete(handleUpdate);
    };
  }, [key]);

  // Fetch initial value from Azure
  useEffect(() => {
    const fetchValue = async () => {
      try {
        const storedValue = await getValue<T>(key);
        if (storedValue !== null) {
          cache.set(key, storedValue);
          setLocalValue(storedValue);
          // Notify other subscribers
          subscribers.get(key)?.forEach(cb => cb(storedValue));
        }
      } catch (error) {
        console.error(`Error fetching value for key "${key}":`, error);
      }
    };

    // Only fetch if not in cache
    if (!cache.has(key)) {
      fetchValue();
    }
  }, [key]);

  // Set value function
  const setValue = useCallback(
    (newValue: T | ((current: T) => T)) => {
      const resolvedValue = typeof newValue === 'function' 
        ? (newValue as (current: T) => T)(value) 
        : newValue;

      // Update local state immediately
      setLocalValue(resolvedValue);
      cache.set(key, resolvedValue);
      
      // Notify other subscribers
      subscribers.get(key)?.forEach(cb => cb(resolvedValue));

      // Persist to Azure (async, fire and forget with retry)
      const persistValue = async (retries = 3) => {
        try {
          const success = await setStorageValue(key, resolvedValue);
          if (!success && retries > 0) {
            setTimeout(() => persistValue(retries - 1), 1000);
          }
        } catch (error) {
          console.error(`Error persisting value for key "${key}":`, error);
          if (retries > 0) {
            setTimeout(() => persistValue(retries - 1), 1000);
          }
        }
      };

      persistValue();
    },
    [key, value]
  );

  return [value, setValue];
}

export default useKV;
