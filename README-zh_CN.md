# Hoist-Peers-Webpack-Resolve-Plugin

加载 **子依赖** 中的 `peerDependencies` 时，使用 **顶层依赖(hoisting)**，不管 **子依赖** 中 `node_modules` 是否已经存在该项。

[English](./README.md) | 简体中文

1. [安装](#Install)
2. [使用方法](#Usage)

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
