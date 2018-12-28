module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
