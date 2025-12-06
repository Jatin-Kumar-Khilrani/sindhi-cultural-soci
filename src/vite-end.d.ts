/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COSMOS_ENDPOINT: string
  readonly VITE_COSMOS_KEY: string
  readonly VITE_COSMOS_DATABASE: string
  readonly VITE_COSMOS_CONTAINER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}