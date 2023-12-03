## Casa Soca 3D playground
Just a playground to play with casa soca building fbx 3D file and navigate from room and stairs inside the building.

Maybe if we get good result we can use this later on for FlipAr tools sets

Require:
* Node 20
* react 
* vite
* three.js 
* @react-three/fiber
* @react-three/drei
* lerp

See the [Wiki](../../wiki) for more info

### install 

#### Build
you can directly build the front end using the Build script:

But first you need to set your .env variables:

```
cp env.example .env
```

This script updates Node Version Manager (NVM) and installs Node.js version 20.
It also:

* → updates or installs pnpm, 
* → updates code from git, 
* → installs packages,
* → builds frontend, 
* → adds .htaccess file, 
* → sets user permissions for build directory,
and allows for removal of node_modules directory if needed.

1. Set user variable.
2. Update NVM from git and load nvm.sh and NVM bash_completion.
3. Install NVM if it's not already installed.
4. Update NPM to the latest version of 20.
5. Check for pnpm and update or install it.
6. Update code from git.
7. Install packages.
8. Build frontend.
9. Add .htaccess file.
10. Set user permissions for build directory.
11. Allow removal of node_modules directory if needed.

```
./build.sh
```

#### install and start in local dev mode
Require node 20
nvm install 20
or 
nvm use 20 
```
cp env.example .env
pnpm install
pnpm start
  VITE v4.3.9  ready in 112 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
