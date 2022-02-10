import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select } from "../../lib/db";

// The itemTitle is used to differenciate between artists & albums bc they don't have the same data

const index = ({ artists }) => {
  return (
    <div>
      <Header title="All Artists"/>
      <List data={artists}/>
    </div>
  );
};

export default index;



export async function getServerSideProps(context) {
  const res = await sql_select({
    rows: "artist as title, picture_url, artist_route as route",
    table: "albums",
    orderBy: "artist",
    groupBy: "artist",
  });
  const artists = JSON.parse(JSON.stringify(res));

  return { props: { artists } };
}
