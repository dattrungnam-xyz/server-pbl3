import sql from "mssql/msnodesqlv8.js";
import config from "./config.js";

const pool = await sql.connect(config);

export default pool ;