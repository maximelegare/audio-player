import React from "react";
import Header from "../../../components/_Partials/Header";
import PageLayout from "../../../components/Layout/PageLayout";
import GridList from "../../../components/_Partials/List/GridList/GridList";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../lib/spotify";
import { useEffect } from "react";


const Index = ({artists}) => {

  return (
    <>
      <Header
      title="Spotify Artists"
      variant="small"
      />
      <PageLayout>
        <GridList data={artists} />
      </PageLayout>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);

  let res;

  if (session) {
    res = await spotifyApi
      .getFollowedArtists({ limit: 20 })
      .then((data) => {
        return data.body.artists.items;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const artists = res.map((artist) => {
    return {
      id: artist.id,
      picture_url: artist.images[0].url,
      title: artist.name,
      route: `/sp/artists/${artist.id}`,
      round:true
    };
  });
  const formatedArtists = JSON.parse(JSON.stringify(artists));
  return {
    props: {
      artists: formatedArtists,
    },
  };
}
