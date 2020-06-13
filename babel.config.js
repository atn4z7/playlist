module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          actions: './app/store/actions',
          selectors: './app/store/selectors',
          styles: './app/styles',
          views: './app/views',
          types: './app/types',
          utils: './app/utils'
        }
      }
    ]
  ]
}
