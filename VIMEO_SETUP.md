
# Vimeo API Setup

To enable automatic video fetching from your Vimeo account, you need to set up Vimeo API credentials.

## Steps:

1. Go to https://developer.vimeo.com/apps
2. Create a new app or use an existing one
3. Get your credentials:
   - Client ID
   - Client Secret
   - Access Token (with "public" and "private" scopes)

## Configure in Replit:

Add these as Secrets in your Repl (use the Secrets tool):

```
VIMEO_CLIENT_ID=your_client_id_here
VIMEO_CLIENT_SECRET=your_client_secret_here
VIMEO_ACCESS_TOKEN=your_access_token_here
```

## Sync Videos:

Once configured, you can sync videos by making a POST request to:
```
POST /api/projects/sync-vimeo
```

Or use the Replit console:
```javascript
fetch('/api/projects/sync-vimeo', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

This will automatically fetch all videos from vimeo.com/grittyflint and add them to your portfolio.
