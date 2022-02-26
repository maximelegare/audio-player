import React from "react";
import GridList from "../../components/_Partials/List/GridList/GridList";
import Header from "../../components/_Partials/Header";

import { sql_query_string } from "../../lib/db";
import PageLayout from "../../components/Layout/PageLayout";
const index = ({ albums }) => {
  return (
    <>
      <Header
        title={albums[0]?.artist}
        smallTitle="Artist"
        src={albums[0]?.picture_url}
      />
      <PageLayout>
        <GridList data={albums} variant="bigCard" />
      </PageLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { artist } = context.query;

  const res = await sql_query_string(`
    SELECT title, picture_url, artist, title_route as route, year FROM albums 
    WHERE artist_route = '${artist}'`);
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
