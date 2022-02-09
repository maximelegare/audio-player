import React from "react";
import Header from "../components/_Partials/Header";
import RowList from "../components/_Partials/List/RowList/RowList";

// import { sql_select } from "../lib/db";

const songs = ({ songs }) => {
  console.log(songs)
  return (
    <div>
      {/* <Header title="All Songs" />
      <RowList data={songs} /> */}
    </div>
  );
};

export default songs;

// export async function getServerSideProps(context) {
//   const res = await sql_select(
//     "id, title, artist, picture_url, album, duration",
//     "songs",
//     "artist"
//   );
//   const songs = JSON.parse(JSON.stringify(res));
//   return { props: { songs } };
// }
