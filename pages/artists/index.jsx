import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select_group } from "../../lib/db";


// The itemTitle is used to differenciate between artists & albums bc they don't have the same data

const index = ({ artists }) => {
  return (
    <div>
      <Header title="All Artists"/>
      <List data={artists} itemTitle="artist"/>
    </div>
  );
};

export default index;



export async function getServerSideProps(context) {
  const res = await sql_select_group(
    "id, artist, picture_url",
    "songs",
    "artist",
    "artist"
  );
  const artists = JSON.parse(JSON.stringify(res));
  return { props: { artists } };
}


