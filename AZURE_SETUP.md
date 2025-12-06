# Azure Cosmos DB Setup Guide

This guide will help you set up Azure Cosmos DB for the Sindhi Cultural Society website.

## Prerequisites

- An Azure subscription
- Azure CLI installed
- GitHub CLI installed (for setting secrets)

## Quick Setup (Already Done)

The following Azure resources have been created:
- **Resource Group**: `sindhi-cultural-rg`
- **Cosmos DB Account**: `sindhi-cultural-db` (Serverless)
- **Database**: `sindhi-db`
- **Container**: `kv-store`
- **Key Vault**: `sindhi-cultural-kv`

## Local Development

For local development, config is fetched from Azure Key Vault:

```bash
# Login to Azure
az login

# Fetch config from Key Vault
npm run setup

# Start dev server
npm run dev

# Or do both in one command
npm run dev:setup
```

## GitHub Secrets (Already Configured)

The following secrets have been set in your GitHub repository:
- `VITE_COSMOS_ENDPOINT`
- `VITE_COSMOS_KEY`
- `VITE_COSMOS_DATABASE`
- `VITE_COSMOS_CONTAINER`

To update them:
```bash
gh secret set VITE_COSMOS_ENDPOINT --body "https://your-account.documents.azure.com:443/"
gh secret set VITE_COSMOS_KEY --body "your-key"
gh secret set VITE_COSMOS_DATABASE --body "sindhi-db"
gh secret set VITE_COSMOS_CONTAINER --body "kv-store"
```

## Cost Estimation

With **Serverless** capacity mode:
- **Free tier**: First 1000 RU/s and 25 GB storage free
- **Pay-as-you-go**: ~$0.25 per 1 million RU (Request Units)

For a small cultural society website, you'll likely stay within free tier or pay < $5/month.

## Troubleshooting

### "Failed to connect to Azure Cosmos DB"
- Verify your endpoint and key are correct
- Check CORS settings include your domain
- Ensure the database and container exist

### "401 Unauthorized"
- Your key may be incorrect or expired
- Regenerate keys in Azure Portal if needed

### Data not persisting
- Check browser console for errors
- Verify container partition key is `/key`
- Ensure your Azure subscription is active

## Security Notes

⚠️ **Important**: The Cosmos DB key is exposed in client-side code. For a production app with sensitive data, consider:

1. Using Azure Functions as a backend API
2. Implementing proper authentication
3. Using Azure AD authentication instead of keys

For a public cultural society website with non-sensitive data (events, leaders, etc.), direct client access is acceptable.
