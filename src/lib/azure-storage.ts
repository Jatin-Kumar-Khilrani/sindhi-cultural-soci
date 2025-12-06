// Azure Cosmos DB configuration for KV storage
// Provides persistent key-value storage via Azure Cosmos DB

import { getConfig } from './config';

interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseId: string;
  containerId: string;
}

// Cached config for performance
let cachedCosmosConfig: CosmosConfig | null = null;

async function getCosmosConfig(): Promise<CosmosConfig> {
  if (cachedCosmosConfig) {
    return cachedCosmosConfig;
  }
  
  const config = await getConfig();
  cachedCosmosConfig = {
    endpoint: config.cosmosEndpoint,
    key: config.cosmosKey,
    databaseId: config.cosmosDatabase,
    containerId: config.cosmosContainer
  };
  return cachedCosmosConfig;
}

interface KVDocument {
  id: string;
  key: string;
  value: unknown;
  _ts?: number;
}

/**
 * Generate authorization token for Cosmos DB REST API
 * 
 * The signature format is:
 * StringToSign = verb + "\n" + resourceType + "\n" + resourceLink + "\n" + date + "\n" + "" + "\n"
 * 
 * CRITICAL: resourceLink for documents is the COLLECTION path, not the document path!
 * For querying docs in collection: resourceLink = "dbs/{db}/colls/{coll}"
 * For reading specific doc: resourceLink = "dbs/{db}/colls/{coll}/docs/{docId}"
 */
async function generateAuthToken(
  verb: string,
  resourceType: string,
  resourceLink: string,
  date: string,
  masterKey: string
): Promise<string> {
  // Decode the master key from base64
  const keyBytes = Uint8Array.from(atob(masterKey), c => c.charCodeAt(0));
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Construct the string to sign
  // Format: verb + "\n" + resourceType + "\n" + resourceLink + "\n" + date + "\n" + "" + "\n"
  const stringToSign = `${verb.toLowerCase()}\n${resourceType.toLowerCase()}\n${resourceLink}\n${date.toLowerCase()}\n\n`;

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(stringToSign)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const token = `type=master&ver=1.0&sig=${sig}`;
  return encodeURIComponent(token);
}

/**
 * Make a request to Cosmos DB REST API
 */
async function cosmosRequest(
  method: string,
  resourceType: string,
  resourceLink: string,
  additionalHeaders?: Record<string, string>,
  body?: unknown
): Promise<Response> {
  const config = await getCosmosConfig();
  
  if (!config.endpoint || !config.key) {
    throw new Error('Azure Cosmos DB configuration is missing');
  }

  // Date must be in RFC 7231 format - use fixed format to ensure consistency
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[now.getUTCDay()];
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const mon = months[now.getUTCMonth()];
  const yyyy = now.getUTCFullYear();
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  const ss = String(now.getUTCSeconds()).padStart(2, '0');
  const date = `${day}, ${dd} ${mon} ${yyyy} ${hh}:${mm}:${ss} GMT`;
  
  // Generate auth token - resourceLink should NOT be lowercased for documents
  // Only verb and resourceType are lowercased, resourceLink keeps original case
  const authToken = await generateAuthToken(
    method, 
    resourceType, 
    resourceLink, 
    date, 
    config.key
  );
  
  // URL includes the resource path - remove trailing slash from endpoint if present
  const baseUrl = config.endpoint.replace(/\/$/, '');
  const url = `${baseUrl}/${resourceLink}`;
  
  const headers: HeadersInit = {
    'Authorization': authToken,
    'x-ms-date': date,
    'x-ms-version': '2018-12-31',
    'Content-Type': 'application/json',
    ...additionalHeaders
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  };

  return fetch(url, options);
}

export async function getValue<T>(key: string): Promise<T | null> {
  const config = await getCosmosConfig();
  
  try {
    // For reading a specific document:
    // resourceLink = "dbs/{db}/colls/{coll}/docs/{docId}"
    const resourceLink = `dbs/${config.databaseId}/colls/${config.containerId}/docs/${key}`;
    
    const response = await cosmosRequest(
      'GET', 
      'docs', 
      resourceLink,
      { 'x-ms-documentdb-partitionkey': '["kv"]' }
    );
    
    if (response.status === 404) {
      // Document doesn't exist - this is expected for missing keys
      return null;
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to get value:', errorText);
      return null;
    }
    
    const doc: KVDocument = await response.json();
    return doc.value as T;
  } catch (error) {
    console.error('Error getting value from Cosmos DB:', error);
    return null;
  }
}

export async function setValue<T>(key: string, value: T): Promise<boolean> {
  const config = await getCosmosConfig();
  
  try {
    // For creating documents:
    // resourceLink = "dbs/{db}/colls/{coll}" (the collection, not the document)
    const resourceLink = `dbs/${config.databaseId}/colls/${config.containerId}`;
    
    const document: KVDocument = {
      id: key,
      key: 'kv', // partition key value
      value
    };
    
    // POST to collection with upsert header
    const response = await cosmosRequest(
      'POST',
      'docs',
      resourceLink,
      { 
        'x-ms-documentdb-partitionkey': '["kv"]',
        'x-ms-documentdb-is-upsert': 'true'
      },
      document
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to set value:', errorText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error setting value in Cosmos DB:', error);
    return false;
  }
}

export async function deleteValue(key: string): Promise<boolean> {
  const config = await getCosmosConfig();
  
  try {
    // For deleting a specific document:
    // resourceLink = "dbs/{db}/colls/{coll}/docs/{docId}"
    const resourceLink = `dbs/${config.databaseId}/colls/${config.containerId}/docs/${key}`;
    
    const response = await cosmosRequest(
      'DELETE', 
      'docs', 
      resourceLink,
      { 'x-ms-documentdb-partitionkey': '["kv"]' }
    );
    
    // 204 or 404 are both considered success for delete
    return response.ok || response.status === 404;
  } catch (error) {
    console.error('Error deleting value from Cosmos DB:', error);
    return false;
  }
}

export async function getAllKeys(): Promise<string[]> {
  const config = await getCosmosConfig();
  
  try {
    // For querying documents:
    // resourceLink = "dbs/{db}/colls/{coll}" (the collection)
    const resourceLink = `dbs/${config.databaseId}/colls/${config.containerId}`;
    
    // Use SQL query to get all document IDs
    const query = {
      query: 'SELECT c.id FROM c WHERE c.key = @partitionKey',
      parameters: [{ name: '@partitionKey', value: 'kv' }]
    };
    
    const response = await cosmosRequest(
      'POST',
      'docs',
      resourceLink,
      { 
        'x-ms-documentdb-partitionkey': '["kv"]',
        'x-ms-documentdb-isquery': 'true',
        'Content-Type': 'application/query+json'
      },
      query
    );
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    return result.Documents?.map((doc: { id: string }) => doc.id) || [];
  } catch (error) {
    console.error('Error getting all keys from Cosmos DB:', error);
    return [];
  }
}
