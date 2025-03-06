# Digital Swirl TS
### Unofficial rewrite of [Digital Swirl](https://github.com/SonicOnset/DigitalSwirl-Client) in [roblox-ts](https://roblox-ts.com)
Some creative liberties have been taken during the rewrite, this is not a 1:1 translation. Attempts were made to convert as much of the project as possible for Rojo's Fully Managed workflow, to make this project as easy as possible to set up. Much of the original code was abstracted and reformatted in an attempt to make the framework more module.

## Building
Source will not run out of the box, some setup is required.
In a new project, ensure you have installed all prerequsites for [roblox-ts](https://roblox-ts.com/docs/quick-start) and follow the quick-start guide. After setup delete `src` and overwrite the project contents with this repo.

If the modules listed in `package.json` do not preinstall, install all `dependencies` listed in `package.json` with `npm install @rbxts/PACKAGE`
From there follow the [Rojo build & serve tutorial](https://rojo.space/docs/v7/getting-started/new-game/#building-your-place) to begin editing.

#### Why are `node_modules`, `include` & `out` excluded?
`node_modules` and `include` were excluded to keep the project small and typescript only. `out` was excluded as compiling with [roblox-ts](https://roblox-ts.com/docs/usage) will automatically fill `out` and transpile to luau. If you want the [lua version of Digital Swirl, look here.](https://github.com/SonicOnset/DigitalSwirl-Client)