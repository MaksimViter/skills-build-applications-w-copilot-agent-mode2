# OctoFit Frontend (React 19 + Vite)

This presentation tier uses `react-router-dom` and fetches data from the backend API on port `8000`.

## Environment Variable

Define `VITE_CODESPACE_NAME` in a local env file such as `.env.local`:

```bash
VITE_CODESPACE_NAME=glorious-couscous-ppwjrp74vwqc7g99
```

When set, API requests use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents invalid URLs such as `https://undefined-8000...`.

## Run

```bash
npm install
npm run dev
```
