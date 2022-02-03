import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  // pages: {
  //   signIn: "Login",
  // },
  callbacks: {
    async jwt({ token, account }) {

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username
  
        return session
      }
  },
});

