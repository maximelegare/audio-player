import { sql_insert, sql_query_string } from "../../lib/db";
import { createUrlRoute } from "../../lib/utilities";
import { playlistRouteTypes as routeType } from "../../lib/route_types/playlist.types";

const handler = async (req, res) => {
  const { type, name, songRoute, playlistName, liked, route } = req.body;

  switch (type) {
    // If create a playlist
    case routeType.CREATE_PLAYLIST: {
      
      try {
        const response = await sql_insert("playlists", {
          title: name,
          route: route,
        });
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }

    // If insert to playlist
    case routeType.ADD_SONG_TO_PLAYLIST: {
      try {
        const response = await sql_insert("song_playlist", {
          song_route: songRoute,
          playlist: playlistName,
        });
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
    case routeType.REMOVE_SONG_FROM_PLAYLIST:{
      try {
        const response = await sql_query_string(
          `DELETE FROM song_playlist WHERE song_route = '${songRoute}' AND playlist = '${playlistName}'`
        );
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }

    case routeType.TOGGLE_LIKED_SONG: {
      try {
        const response = await sql_query_string(
          `UPDATE songs SET liked = ${liked} WHERE title_route = '${songRoute}'`
        );
        return res.json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  }
};

export default handler;
