import { sql_select } from "../../lib/db";

const handler = async (req, res) => {
    try {
        
      const response = await sql_select("SELECT title, route FROM playlists");
      return res.status(200).json({ playlists: response });
        
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
  
  export default handler;
  