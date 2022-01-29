module.exports = {
  reactStrictMode: true,
  images:{
    domains:["upload.wikimedia.org"]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
};
