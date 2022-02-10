import React from "react";
import GridList from "../../components/_Partials/List/GridList/GridList";
import Header from "../../components/_Partials/Header";

import { sql_select } from "../../lib/db";

const index = ({albums}) => {
  console.log(albums)

  return (
    <div>
      <Header title={albums[0].artist} src={albums[0].picture_url}/>
      <GridList data={albums}/>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {

  const {artist} = context.query

  const res = await sql_select(
    {},
    `SELECT title, picture_url, artist FROM albums WHERE artist_route = '${artist}'`
  );
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
