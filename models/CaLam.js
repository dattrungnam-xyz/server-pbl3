import pool from "../connectDB.js";

export class CaLam {
  async getAllCaLam() {
    const response = await pool
      .request()
      .query(`SELECT * from CaLam `);
    return response.recordsets[0];
  }
  
}
