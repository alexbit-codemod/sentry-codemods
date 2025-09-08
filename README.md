<img
  src=".github/assets/sentry-codemods.png"
  alt="Sentry SDK Migration Codemods"
/>

> **REMOEV THIS SECTION ONCE THE REPO IS SET UP.**
> 
> Sentry team: This repo comes with a one-time setup guide, utilities, and a GitHub Action to help you and your community build and publish codemods with ease.
> ## One-time Setup
>
> ### Secure a "scope" for your org
> 1. Go to [Codemod Studio](https://app.codemod.com/studio) and sign in with your GitHub account.  
> 2. Install the Codemod app:
>    1. In **Results** section of the studio, click **Select Repo**. That will install Codemod GitHub App on selected repos.  
>    3. Installing the app for a repo in your GitHub org automatically reserves a **scope** matching your org name.  
>     - Benefit? only admins of the `getsentry` org can publish codemods starting with `@getsentry`.  
>     - All official codemods appear in the Registry under that scope.  
>     - **Important:** In `codemod.yaml`, the name must start with your `@scope`, or it won’t show up when users filter with `@getsentry` in the registry.
>
> ### Authorize GitHub Action
> 1. Generate an API key from [Codemod app](https://app.codemod.com/api-keys).  
> 2. In your GitHub repo: **Settings → Secrets & variables → actions**  
>    1. Create a repository secret.    
>      - Name: `CODEMOD_API_KEY`  
>      - Value: the key from step 1.  
>
> ✅ Done! Now, after a codemod PR is merged, you can trigger a GitHub Action to auto-publish it to the [Codemod Registry](https://app.codemod.com/registry) under your org scope. See [Node.js codemods](https://codemod.link/nodejs-official) for an example.
---


Sentry codemods to help users adopt new features and handle breaking changes with ease.

Community contributions are welcome and appreciated! Check open issues for codemods to build, or open a new one if something’s missing. See the [contribution guide](./CONTRIBUTING.md) for details.

## Running codemods
> [!CAUTION]
> Caution: Codemods modify code! Run them only on Git-tracked files, and commit or stash changes first.
### From the registry 
Recommended for better UX, downloads the package from [registry](https://app.codemod.com/registry).

```bash
npx codemod@latest <codemod-name>
```
For example: 
```
npx codemod@latest flatten-experiments-config
```
### From the source 
```bash
npx codemod workflow run -w /path/to/folder/containing/workflow.yaml
```

> [!NOTE]
> By default, codemods run in the current folder. Add `-t /target/path` to your command to change it.

See the [Codemod docs](https://go.codemod.com/cli-docs) for all CLI commands and options.
  

## License

MIT
