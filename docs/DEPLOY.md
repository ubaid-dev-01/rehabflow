# Deploy — rehabflow

## Vercel project
- Name: `rehabflow`
- GitHub: https://github.com/ubaid-dev-01/rehabflow

## CLI
```bash
cd RehabFlow
vercel --prod --yes
```

## Pipeline
1. Native Git: `vercel git connect https://github.com/ubaid-dev-01/rehabflow.git`
2. GitHub Actions: set secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

