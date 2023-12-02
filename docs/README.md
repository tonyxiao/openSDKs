# Mintlify Starter Kit

Currently hosted at https://opensdks.mintlify.app/, will migrate to https://docs.opensdks.org later

### Development

```bash
pnpm dev
```

### Publishing Changes

```bash
git push
```
Changes will be deployed to production automatically after pushing to the main branch. 

#### Troubleshooting

- Mintlify dev isn't running - Run `pnpm mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`
