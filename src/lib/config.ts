// Runtime configuration that can be fetched from Azure Key Vault or environment variables
// For production builds (GitHub Pages), values come from build-time env vars
// For local dev, you can fetch from Key Vault or use .env.local

interface RuntimeConfig {
  cosmosEndpoint: string;
  cosmosKey: string;
  cosmosDatabase: string;
  cosmosContainer: string;
}

let cachedConfig: RuntimeConfig | null = null;

// Check if we have build-time environment variables (production)
function hasBuildTimeConfig(): boolean {
  return !!(
    import.meta.env.VITE_COSMOS_ENDPOINT &&
    import.meta.env.VITE_COSMOS_KEY
  );
}

// Get config from build-time environment variables
function getBuildTimeConfig(): RuntimeConfig {
  return {
    cosmosEndpoint: import.meta.env.VITE_COSMOS_ENDPOINT || '',
    cosmosKey: import.meta.env.VITE_COSMOS_KEY || '',
    cosmosDatabase: import.meta.env.VITE_COSMOS_DATABASE || 'sindhi-db',
    cosmosContainer: import.meta.env.VITE_COSMOS_CONTAINER || 'kv-store'
  };
}

// Fetch config from a public config endpoint (for runtime config without secrets exposure)
// This is useful if you want to load non-sensitive config at runtime
async function fetchRuntimeConfig(): Promise<RuntimeConfig | null> {
  try {
    // Check for local config file first (for development)
    const response = await fetch('/config.json');
    if (response.ok) {
      const config = await response.json();
      return {
        cosmosEndpoint: config.cosmosEndpoint || '',
        cosmosKey: config.cosmosKey || '',
        cosmosDatabase: config.cosmosDatabase || 'sindhi-db',
        cosmosContainer: config.cosmosContainer || 'kv-store'
      };
    }
  } catch {
    // Config file not found, that's okay
  }
  return null;
}

export async function getConfig(): Promise<RuntimeConfig> {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Priority 1: Build-time environment variables (production builds)
  if (hasBuildTimeConfig()) {
    cachedConfig = getBuildTimeConfig();
    return cachedConfig;
  }

  // Priority 2: Runtime config file (for local dev without .env.local)
  const runtimeConfig = await fetchRuntimeConfig();
  if (runtimeConfig && runtimeConfig.cosmosEndpoint) {
    cachedConfig = runtimeConfig;
    return cachedConfig;
  }

  // Priority 3: Fall back to build-time config even if incomplete
  cachedConfig = getBuildTimeConfig();
  return cachedConfig;
}

// Synchronous getter for when config is already loaded
export function getConfigSync(): RuntimeConfig | null {
  return cachedConfig;
}

// Check if config is properly loaded
export function isConfigured(): boolean {
  return !!(cachedConfig?.cosmosEndpoint && cachedConfig?.cosmosKey);
}
