import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select_group } from "../../lib/db";

const index = ({ artists }) => {
  console.log(artists);
  return (
    <div>
      <Header />
      <List />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const res = await sql_select_group(
    "artist, picture_url",
    "songs",
    "artist",
    "artist"
  );
  const artists = JSON.parse(JSON.stringify(res));
  return { props: { artists } };
}
