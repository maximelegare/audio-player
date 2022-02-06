import React from 'react';

const index = ({albums}) => {
  return <div></div>;
};

export default index;



export async function getServerSideProps(context) {
  const res = await sql_select_group(
    "artist, picture_url, album",
    "songs",
    "album",
    "artist"
  );
  const albums = JSON.parse(JSON.stringify(res));
  return { props: { albums } };
}
