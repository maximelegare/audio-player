import { sql_insert } from "../../lib/db";
import { createUrlRoute } from "../../lib/utilities";
import { playlistRouteTypes as routeType } from "../../lib/route_types/playlist.types";


const handler = async (req, res) => {
  const { type, name, songRoute, playlistName } = req.body;

  switch (type) {

    // If create a playlist
    case routeType.CREATE_PLAYLIST: {
      const route = createUrlRoute(["playlists", req.body.name]);
      console.log(name)
      try {
        const response = await sql_insert("playlists", {
          title: name,
          route: `/${route}`,
        });
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }

    case routeType.ADD_SONG_TO_PLAYLIST:{

      // If insert to playlist
      try {
        const response = await sql_insert("song_playlist", {
          song_route: songRoute,
          playlist: playlistName
        });
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }

  }
};

export default handler;
