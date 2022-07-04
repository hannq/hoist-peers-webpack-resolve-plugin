# Hoist-Peers-Webpack-Resolve-Plugin

use hoisting dep's peerDependencies even though already existing in dep's node_modules

English | [简体中文](./README-zh_CN.md)

1. [Install](#Install)
2. [Usage](#Usage)
2. [Options](#Options)

## Install

```bash
npm i hoist-peers-webpack-resolve-plugin --save-dev
```

## Usage

### using webpack.config.js

```js
// webpack.config.js

// ...
const { HoistPeersWebpackResolvePlugin } = require('hoist-peers-webpack-resolve-plugin');

module.exports = {
  // ...
  resolve: {
    // ...
    plugins: [
      // ...
      new HoistPeersWebpackResolvePlugin({ deps: ['your-npm-link-dep-name'] })
    ]
  },
  // ...
}
```

### using webpack-chain

```js
// webpack.config.js

// ...
const Config = require('webpack-chain');
const { HoistPeersWebpackResolvePlugin } = require('hoist-peers-webpack-resolve-plugin');

// ...
const config = new Config();

// ...
config.resolve
  .plugin('HoistPeersWebpackResolvePlugin')
    .use(HoistPeersWebpackResolvePlugin, [{ deps: ['@apaas/common'] }]);

// ...

module.exports = config.toConfig();
```

**Tips**: more options see [webpack-chain](https://www.npmjs.com/package/webpack-chain).

## Options

### deps

+ **type**: `string[]`
+ **required**: `true`
+ **desc**: dependences's names which peers need to be force hoisted.
+ **examples**:
  ```js
    new HoistPeersWebpackResolvePlugin({ deps: ['lodash'] });
  ```

### options

+ **type**: `object`
+ **required**: `false`
+ **desc**: polyfills for webpack v4. (only works in webpack v4)
+ **example**:
  ```js
    new HoistPeersWebpackResolvePlugin({
      deps: ['lodash'],
      {
        symlinks: true,
        modules: [path.join(__dirname, './node_modules')],
        roots: [path.join(__dirname)],
      }
    });
  ```

#### options.symlinks

+ **type**: `boolean`
+ **required**: `true` (if in webpack v4)
+ **desc**: the same option of webpack config [config.resolve.symlinks](https://v4.webpack.js.org/configuration/resolve/#resolvesymlinks).

#### options.modules

+ **type**: `string[]`
+ **required**: `true` (if in webpack v4)
+ **desc**: the same option of webpack config [config.resolve.modules](https://v4.webpack.js.org/configuration/resolve/#resolvemodules).
+ **tips**: must be absolute path.

#### options.roots

+ **type**: `string[]`
+ **required**: `true` (if in webpack v4)
+ **desc**: the same option of webpack config [config.resolve.roots](https://v4.webpack.js.org/configuration/resolve/#resolveroots).
+ **tips**: must be absolute path.
