import { sql_query_string } from "../../lib/db";

const handler = async (_, res) => {
  try {
      
    const response = await sql_query_string();
    // const responseData = await response.json()
    return res.json(response);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
