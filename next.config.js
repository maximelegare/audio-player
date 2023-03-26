const withPWA = require("next-pwa")


module.exports = withPWA({
  reactStrictMode: true,
  pwa:{
    dest:"public",
    register:true,
    skipWaiting:true,
    disable:process.env.NODE_ENV === 'development'
  },
  images:{
    domains:["res.cloudinary.com", "firebasestorage.googleapis.com", "i.scdn.co"]
  },
  
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
    
  },
  async redirects() {
    return [
      {
        source: '/sp',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ]
  // }
});
