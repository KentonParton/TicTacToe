module.exports = {
  presets: [
    'module:metro-react-native-babel-preset'
  ],
  "env": {
    "development": {
      "plugins": [
        "@babel/transform-react-jsx-source",
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
      ]
    }
  }
};
