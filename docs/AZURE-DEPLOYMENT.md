# Azure deployment

## Approved boundary

This project is designed for exactly one Azure Static Web App on the Free SKU, inside the dedicated website-demo resource group. It requires no paid Azure dependency.

Expected resources:

- Resource group: `rg-gtp-website-demos`
- Static Web App: `gtp-special-occasion-showcase`
- SKU: `Free`
- Expected Azure hosting cost: `$0.00/month` while usage remains inside current Free-plan limits

Required tags:

- `Owner=Griffin Technology Partners`
- `Purpose=Website Demos`
- `Environment=Portfolio`
- `CostProfile=FreeOnly`
- `ManagedBy=Codex`

## CI/CD

`.github/workflows/azure-static-web-apps.yml` builds `dist` on pushes to `main` and deploys with the official Azure Static Web Apps action. The deployment token must exist only as the encrypted repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.

## Free-plan check

Before every cloud action, explicitly select and print the intended subscription. Then verify the resource:

```powershell
az staticwebapp show --name gtp-special-occasion-showcase --resource-group rg-gtp-website-demos --query "{name:name,sku:sku.name,host:defaultHostname}" -o json
az resource list --resource-group rg-gtp-website-demos --query "[].{name:name,type:type,sku:sku.name}" -o table
```

The second command should list only the Static Web App. Stop before accepting any change that requires Standard, Dedicated, or a separate billable service.

## Routing

`public/staticwebapp.config.json` is copied into `dist`. It provides the custom 404 response, immutable caching for built assets and local media, MIME mappings, and security headers. Astro emits physical route directories so direct deep-link refreshes resolve without a catch-all rewrite.
