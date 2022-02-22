import { sql_insert } from "../../lib/db";
import { createUrlRoute } from "../../lib/utilities";


const handler = async (req, res) => {
    const {name} = req.body


    const route = createUrlRoute(["playlists", name])
    try {
        
      const response = await sql_insert("playlists", {title:name, route:`/${route}`});
      return res.json(response);
  
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  
  export default handler;
  