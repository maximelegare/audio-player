import { sql_query_string } from "../../lib/db";

const handler = async (req, res) => {
    try {
        
      const response = await sql_query_string("SELECT title, route, id FROM playlists WHERE portfolio = 1");
      return res.status(200).json({ playlists: response });
        
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
  
  export default handler;
  