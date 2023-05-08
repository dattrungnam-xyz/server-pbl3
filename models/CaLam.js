import pool from "../connectDB.js";

export class CaLam {
  async getAllCaLam() {
    const response = await pool.request().query(`select * from CaLam 
      ORDER  by IdNhanVien,Ca,Thu ASC	 `);
    return response.recordsets[0];
  }
  async updateCaLam(IdNhanVien,Thu,Ca,AnCaLam)
  {
    const response = await pool.request().query(`
          UPDATE CaLam
          SET  AnCaLam = ${AnCaLam}
          WHERE IdNhanVien = ${IdNhanVien} and Thu = '${Thu}' and Ca = ${Ca};
    
    `);
    return response.recordsets[0];
  }
  async addCaLam(IdNhanVien,Thu,Ca) {
    const response = await pool.request().query(`
    INSERT INTO CaLam (IdNhanVien, Thu, Ca, AnCaLam)
    VALUES (${IdNhanVien}, '${Thu}', ${Ca}, 0);
    `);
    return response.recordsets[0];
  }
}
