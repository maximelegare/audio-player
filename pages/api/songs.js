import { sql_select } from "../../lib/db";

const handler = async (_, res) => {
  try {
      
    const response = await sql_select();
    // const responseData = await response.json()
    // console.log(responseData)
    return res.json(response);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
