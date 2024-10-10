module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets/',
            '@components': './src/components/',
            '@routes': './src/routes/',
            '@screens': './src/screens/',
            '@store': './src/store/',
            '@utils': './src/utils/',
            '@theme': './src/theme',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          root: ['.'],
        },
      ],
    ],
  }
}
