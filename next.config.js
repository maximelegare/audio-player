module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe|flac|m4a?g)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });
    return config;
  },
};
