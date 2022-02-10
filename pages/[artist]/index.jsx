import React from "react";
import GridList from "../../components/_Partials/List/GridList/GridList";
import Header from "../../components/_Partials/Header";

import PageLayout from "../../components/Layout/PageLayout";

import { sql_select } from "../../lib/db";

const index = ({ albums }) => {
  console.log(albums);

  return (
    <>
      <Header title={albums[0].artist} src={albums[0].picture_url} />
      <PageLayout>
        <GridList data={albums} variant="bigCard" />
      </PageLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { artist } = context.query;

  const res = await sql_select(
    {},
    `SELECT title, picture_url, artist, year FROM albums WHERE artist_route = '${artist}'`
  );
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
