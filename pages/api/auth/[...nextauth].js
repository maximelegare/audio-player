import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyApi, {LOGIN_URL} from "../../../lib/spotify";



async function refreshAccessToken(token) {
  try {
    spotifyApi.setClientSecret(process.env.NEXT_PUBLIC_CLIENT_SECRET)
    spotifyApi.setClientId(process.env.NEXT_PUBLIC_CLIENT_ID)
    spotifyApi.setRefreshToken(token.refreshToken);
    
    // Refresh the token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    
    spotifyApi.setAccessToken(refreshedToken);

    return {

      // Send the new token 
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    };

  } catch (error) {

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}



export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {

    // JSON WEB TOKEN scenarios
    async jwt({ token, account, user }) {

      //   Initial sign in of the user
      if (account && user) {
    
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          
        };
      }

      // Return previous token if the token access has not expired yet
      if (Date.now() < token.accessTokenExpires) {
     
      
        return token;
      }

    //   If the token expired, refresh the token usibg


      
      return await refreshAccessToken(token);
    },

    async session({session, token}){
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }

  },
});

