import React from "react";
import Header from "../../../../components/_Partials/Header";
import PageLayout from "../../../../components/Layout/PageLayout";
import RowList from "../../../../components/_Partials/List/RowList/RowList";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../../lib/spotify";
import { useEffect } from "react";

const Index = ({ albumSongs, albumInfos }) => {
  return (
    <>
      <Header
        title={albumInfos.title}
        src={albumInfos.image}
        smallTitle={albumInfos.artist}
      />
      <PageLayout>
        <RowList data={albumSongs} />
      </PageLayout>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const { album } = context.query;
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);

  let res;

  if (session) {
    res = await spotifyApi.getAlbum(album).then(
      (data) => {
        return data.body;
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }

  const albumSongs = res?.tracks.items.map((item) => {
    console.log(res.images[0].url)
    return {
      id: item.id,
      title: item.name,
      artist: res.artists[0].name,
      picture_url: res.images[0].url,
      album: res.name,
      duration: item.duration_ms / 1000,
      ...item,
    };
  });
  let albumInfos;
  if (res) {
    albumInfos = {
      id: res.id,
      title: res.name,
      artist: res.artists[0].name,
      image: res.images[0].url,
      year: res.release_date.slice(0, 5),
    };
  }
  const formatedAlbumInfos = JSON.parse(JSON.stringify(albumInfos))  
  const formatedAlbumSongs = JSON.parse(JSON.stringify(albumSongs));
  return {
    props: {
      albumSongs: formatedAlbumSongs,
      albumInfos: formatedAlbumInfos,
    },
  };
}
