import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_query_string } from "../../lib/db";
import PageLayout from "../../components/Layout/PageLayout";

const index = ({ albums }) => {
  return (
    <div>
      <Header title="Hodei Albums" variant="small" />
      <PageLayout>
        <List data={albums} variant="bigCard" />
      </PageLayout>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const res = await sql_query_string(`
  SELECT title, picture_url, title_route as route, artist, year 
  FROM albums 
  ORDER BY title`);

  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
