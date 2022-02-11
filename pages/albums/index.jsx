import React from "react";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/GridList/GridList";

import { sql_select } from "../../lib/db";

import PageLayout from "../../components/Layout/PageLayout";

const index = ({ albums }) => {
  console.log(albums);
  return (
    <div>
      <Header title="All Albums" />
      <PageLayout>
        <List data={albums} variant="bigCard" />
      </PageLayout>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { artist } = context.query;

  const res = await sql_select({
    rows: "title, picture_url, title_route as route",
    table: "albums",
    orderBy: "title",
  });
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
