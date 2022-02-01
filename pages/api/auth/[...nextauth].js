import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { ONE_DRIVE_LOGIN_URL } from "../../../lib/onedrive";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_FL_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_FL_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_FL_TENANT_ID,
      // authorization:ONE_DRIVE_LOGIN_URL
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "Login",
  },
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

