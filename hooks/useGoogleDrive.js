import { useEffect } from "react/";
import { useSession, signIn } from "next-auth/react";

import { googleDriveAPI } from "../lib/googledrive";


export const useGoogleDrive = () => {

    
  const { data: session } = useSession();

  useEffect(() => {

    // Check if there is a session (meaning the user logged in successfully)
    if (session) {

      // If there is an error with the refresh token 
      if ((session.error = "RefreshAccessTokenError")) {
        signIn();
      }


      // Otherwise return the googleDrive API   
      return googleDriveAPI;
    }
  }, [session]);
};



