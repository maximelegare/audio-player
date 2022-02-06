import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select_group } from "../../lib/db";

const index = ({ albums }) => {
  return (
    <div>
      <Header />
      <List data={albums} itemTitle="album" />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const res = await sql_select_group(
    "id, artist, picture_url, album",
    "songs",
    "album",
    "artist"
  );
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
