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
    domains:["res.cloudinary.com", "firebasestorage.googleapis.com"]
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
  
});
