import React from 'react';
import GridList from '../../components/_Partials/List/GridList/GridList';
import Header from '../../components/_Partials/Header';

// import { sql_select } from '../../lib/db';

const index = () => {
  return <div>
      {/* <Header />
      <GridList /> */}
  </div>;
};

export default index;

// export async function getServerSideProps(context) {
//     const res = await sql_select(
//       "id, title, artist, picture_url, album, duration",
//       "songs",
//       "artist"
//     );
//     const songs = JSON.parse(JSON.stringify(res));
//     return { props: { songs } };
//   }


