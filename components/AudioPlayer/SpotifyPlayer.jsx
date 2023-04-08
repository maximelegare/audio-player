import React from "react";

export const SpotifyPlayer = ({uri}) => {
  return (
    <div>
      <iframe
        width="100%"
        height="90"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        src={`https://open.spotify.com/embed?uri=${uri}`}
      ></iframe>
    </div>
  );
};
