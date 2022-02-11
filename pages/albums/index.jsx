import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select } from "../../lib/db";


const index = ({ albums }) => {
  return (
    <div>
      <Header title="All Albums" />
        <List data={albums} variant="bigCard" />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {

  const res = await sql_select({
    rows: "title, picture_url, title_route as route, artist, year",
    table: "albums",
    orderBy: "title",
  });
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
