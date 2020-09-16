# DEV

npm install --save-dev @babel/core @babel/cli @babel/preset-env

babel : @babel/core @babel/cli @babel/preset-env

```javascript
{
  "presets": ["@babel/preset-env"],
  "plugins": [...]
}

```

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [require("@babel/plugin-transform-object-rest-spread")],
        },
      },
    },
  ];
}
```

webpack plugin

npm install -D babel-loader

# fsevent



# 单元测试
