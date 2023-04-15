
import dynamic from "next/dynamic";
import React from 'react'
import { useSession } from "next-auth/react";
const SpotifyPlayer = dynamic(() => import("react-spotify-web-playback"), {
  loading: () => <p>Loading...</p>,
});
import { When } from "react-if";

import { useRecoilValue } from "recoil";
import { spotifyIsPlayingAtom } from "../../atoms/audioAtomSpotify";


export const SpotifyPlayerComponent = ({uri}) => {
  
   const { data: session } = useSession();
  const spotifyIsPlaying = useRecoilValue(spotifyIsPlayingAtom);

  console.log(session?.user.accessToken);
  return (
    <div className="mt-[15px]">
      <When condition={session?.user.accessToken}>
        <SpotifyPlayer

          uris={[uri]}
          token={session?.user.accessToken}
          play={spotifyIsPlaying}
          styles={{
            sliderTrackColor: "#ffe3d4",
            sliderColor: "rgb(90, 20, 160)",
            sliderHandleColor: "rgb(63, 16, 110)",
            sliderDurationFontSize: "16px",
            sliderDurationFontFamily: "monospace",
            color: "#ffe3d4",
            sliderHeight: 7,
          }}
        />
      </When>
    </div>
  );
  
}



// const SpotifyPlayerComponent = ({ uri }) => {
//   return 
//   <></>
//   // const { data: session } = useSession();
//   // const spotifyIsPlaying = useRecoilValue(spotifyIsPlayingAtom);

//   // console.log(session?.user.accessToken);
//   // return (
//   //   <div className="mt-[15px]">
//   //     <When condition={session?.user.accessToken}>
//   //       {/* <SpotifyPlayer

//   //         uris={[uri]}
//   //         token={session?.user.accessToken}
//   //         play={spotifyIsPlaying}
//   //         styles={{
//   //           sliderTrackColor: "#ffe3d4",
//   //           sliderColor: "rgb(90, 20, 160)",
//   //           sliderHandleColor: "rgb(63, 16, 110)",
//   //           sliderDurationFontSize: "16px",
//   //           sliderDurationFontFamily: "monospace",
//   //           color: "#ffe3d4",
//   //           sliderHeight: 7,
//   //         }}
//   //       /> */}
//   //     </When>
//   //   </div>
//   // );
// };
// export default SpotifyPlayerComponent




