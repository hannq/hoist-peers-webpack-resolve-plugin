# Hoist-Peers-Webpack-Resolve-Plugin

加载 **子依赖** 中的 `peerDependencies` 时，使用 **顶层依赖(hoisting)**，不管 **子依赖** 中 `node_modules` 是否已经存在该项。

[English](./README.md) | 简体中文

1. [安装](#安装)
2. [使用方法](#使用方法)
2. [配置项](#配置项)

## 安装

```bash
npm i hoist-peers-webpack-resolve-plugin --save-dev
```

## 使用方法

### 使用 webpack.config.js

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

### 使用 webpack-chain

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

**提示**: 更多配置，见 [webpack-chain](https://www.npmjs.com/package/webpack-chain)。

## 配置项

### deps

+ **类型**: `string[]`
+ **必填**: 是
+ **描述**: 子外部依赖(`peerDependencies`)需要被强制提升的库名称。
+ **用法示例**:
  ```js
    new HoistPeersWebpackResolvePlugin({ deps: ['lodash'] });
  ```

### options

+ **类型**: `object`
+ **必填**: 否
+ **描述**: 此项为 `webpack@4.x` 兼容性配置（只在 `webpack@4.x` 版本有效）
+ **用法示例**:
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

+ **类型**: `boolean`
+ **必填**: 是（如果使用的是 `webpack@4.x` 版本）
+ **描述**: `webpack` 的 [config.resolve.symlinks](https://v4.webpack.js.org/configuration/resolve/#resolvesymlinks) 同名配置。

#### options.modules

+ **类型**: `string[]`
+ **必填**: 是（如果使用的是 `webpack@4.x` 版本）
+ **描述**: `webpack` 的 [config.resolve.modules](https://v4.webpack.js.org/configuration/resolve/#resolvemodules) 同名配置。
+ **提示**: 必须是绝对路径。

#### options.roots

+ **类型**: `string[]`
+ **必填**: 是（如果使用的是 `webpack@4.x` 版本）
+ **描述**: `webpack` 的 [config.resolve.roots](https://v4.webpack.js.org/configuration/resolve/#resolveroots) 同名配置。
+ **提示**: 必须是绝对路径。

