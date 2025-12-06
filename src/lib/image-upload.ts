// Azure Blob Storage image upload service
import { getConfig } from './config';

interface StorageConfig {
  account: string;
  key: string;
  container: string;
}

let cachedStorageConfig: StorageConfig | null = null;

async function getStorageConfig(): Promise<StorageConfig> {
  if (cachedStorageConfig) {
    return cachedStorageConfig;
  }
  
  const config = await getConfig();
  cachedStorageConfig = {
    account: config.storageAccount || '',
    key: config.storageKey || '',
    container: config.storageContainer || 'images'
  };
  return cachedStorageConfig;
}

/**
 * Generate authorization header for Azure Blob Storage
 */
async function generateBlobAuthHeader(
  method: string,
  contentLength: number,
  contentType: string,
  blobName: string,
  date: string,
  storageAccount: string,
  storageKey: string,
  container: string
): Promise<string> {
  // Simplified authorization using SAS token approach is more practical for browser
  // For direct REST API, we need to generate SharedKey signature
  
  const keyBytes = Uint8Array.from(atob(storageKey), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // String to sign for Blob service
  const stringToSign = [
    method,                          // HTTP verb
    '',                              // Content-Encoding
    '',                              // Content-Language
    contentLength > 0 ? contentLength.toString() : '', // Content-Length
    '',                              // Content-MD5
    contentType,                     // Content-Type
    '',                              // Date (use x-ms-date instead)
    '',                              // If-Modified-Since
    '',                              // If-Match
    '',                              // If-None-Match
    '',                              // If-Unmodified-Since
    '',                              // Range
    `x-ms-blob-type:BlockBlob`,      // CanonicalizedHeaders
    `x-ms-date:${date}`,
    `x-ms-version:2020-10-02`,
    `/${storageAccount}/${container}/${blobName}` // CanonicalizedResource
  ].join('\n');

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(stringToSign)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `SharedKey ${storageAccount}:${sig}`;
}

/**
 * Upload an image file to Azure Blob Storage
 * @param file The file to upload
 * @param folder Optional folder path (e.g., 'leaders', 'events')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, folder?: string): Promise<string> {
  const config = await getStorageConfig();
  
  if (!config.account || !config.key) {
    throw new Error('Azure Storage configuration is missing');
  }

  // Generate unique blob name
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const blobName = folder 
    ? `${folder}/${timestamp}-${safeName}`
    : `${timestamp}-${safeName}`;

  const date = new Date().toUTCString();
  
  const authHeader = await generateBlobAuthHeader(
    'PUT',
    file.size,
    file.type || 'application/octet-stream',
    blobName,
    date,
    config.account,
    config.key,
    config.container
  );

  const url = `https://${config.account}.blob.core.windows.net/${config.container}/${blobName}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': authHeader,
      'x-ms-date': date,
      'x-ms-version': '2020-10-02',
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Length': file.size.toString()
    },
    body: file
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Upload failed:', response.status, errorText);
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  return url;
}

/**
 * Get the public URL for an uploaded image
 */
export function getImageUrl(blobName: string): string {
  // This will be called after config is loaded
  const account = cachedStorageConfig?.account || '';
  const container = cachedStorageConfig?.container || 'images';
  return `https://${account}.blob.core.windows.net/${container}/${blobName}`;
}
