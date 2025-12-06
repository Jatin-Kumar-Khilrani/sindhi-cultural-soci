# Fetch configuration from Azure Key Vault and create config.json for local development
# Run this script before starting the dev server

Write-Host "Fetching configuration from Azure Key Vault..." -ForegroundColor Cyan

# Check if logged in to Azure
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "Please login to Azure first: az login" -ForegroundColor Red
    exit 1
}

Write-Host "Logged in as: $($account.user.name)" -ForegroundColor Green

# Fetch secrets from Key Vault
$vaultName = "sindhi-cultural-kv"

Write-Host "Fetching secrets from Key Vault: $vaultName" -ForegroundColor Cyan

try {
    $cosmosEndpoint = az keyvault secret show --vault-name $vaultName --name cosmos-endpoint --query value -o tsv
    $cosmosKey = az keyvault secret show --vault-name $vaultName --name cosmos-key --query value -o tsv
    $cosmosDatabase = az keyvault secret show --vault-name $vaultName --name cosmos-database --query value -o tsv
    $cosmosContainer = az keyvault secret show --vault-name $vaultName --name cosmos-container --query value -o tsv
    
    # Fetch storage secrets
    $storageAccount = az keyvault secret show --vault-name $vaultName --name storageAccount --query value -o tsv 2>$null
    $storageKey = az keyvault secret show --vault-name $vaultName --name storageKey --query value -o tsv 2>$null
    $storageContainer = az keyvault secret show --vault-name $vaultName --name storageContainer --query value -o tsv 2>$null
    
    if (-not $cosmosEndpoint -or -not $cosmosKey) {
        Write-Host "Failed to fetch secrets from Key Vault" -ForegroundColor Red
        exit 1
    }
    
    # Create config.json in public folder
    $config = @{
        cosmosEndpoint = $cosmosEndpoint
        cosmosKey = $cosmosKey
        cosmosDatabase = $cosmosDatabase
        cosmosContainer = $cosmosContainer
        storageAccount = $storageAccount
        storageKey = $storageKey
        storageContainer = $storageContainer
    }
    
    $configJson = $config | ConvertTo-Json -Depth 10
    $configPath = Join-Path $PSScriptRoot "public" "config.json"
    
    # Create public folder if it doesn't exist
    $publicFolder = Join-Path $PSScriptRoot "public"
    if (-not (Test-Path $publicFolder)) {
        New-Item -ItemType Directory -Path $publicFolder | Out-Null
    }
    
    $configJson | Set-Content -Path $configPath -Encoding UTF8
    
    Write-Host "`nConfiguration saved to: $configPath" -ForegroundColor Green
    Write-Host "`nYou can now run: npm run dev" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error fetching secrets: $_" -ForegroundColor Red
    exit 1
}
