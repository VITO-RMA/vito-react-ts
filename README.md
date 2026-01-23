# Installation guide

#### Step 1 - Install degit

```bash npm install -g degit```  

```bash pnpm add -g degit```

#### Step 2 - Use degit to create a new project  

```bash degit https://github.com/VITO-RMA/vito-react-ts.git my-new-vite-project ```

#### Step 3 - Enable workspace version of typescript

``` ctrl + shift + p ```  

``` Select TypeScript Version ```

``` Use Workspace Version ```

# Yarn to pnpm
  
#### Step 1 - delete yarn related files

```bash rm -rf .yarnrc.yml yarn.lock .pnp.cjs .pnp.loader.mjs .yarn```

#### Step 2 - Remove yarn version from package.json

#### Step 3 - Let's go: **pnpm install**
