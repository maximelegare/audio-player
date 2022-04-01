import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name:"credentials",
      id:"credentials",
      async authorize(credentials){
        
        if(credentials.username === ""){}
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

