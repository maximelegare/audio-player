import React from "react";
import Header from "../../../components/_Partials/Header";
import PageLayout from "../../../components/Layout/PageLayout";
import GridList from "../../../components/_Partials/List/GridList/GridList";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../lib/spotify";

const Index = ({ albums }) => {


  return (
    <>
      <Header title="Spotify albums" variant="small" />
      <PageLayout>
        <GridList data={albums} variant="bigCard" />
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
      .getMySavedAlbums({
        limit: 20,
      })
      .then(
        (data) => {
          return data.body.items;
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  const albums = res.map(({album}) => {
    return {
      id: album.id,
      picture_url: album.images[0].url,
      artist: album.artists[0].name,
      route: `/sp/albums/${album.id}`,
      images:album.images,
      year:album.release_date.slice(0,4),
      title:album.name,
      provider:"spotify"
    };
  });
    const formatedAlbums = JSON.parse(JSON.stringify(albums));
  return {
    props: {
        albums: formatedAlbums,
    },
  };
}
