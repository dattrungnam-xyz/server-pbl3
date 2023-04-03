import pool from "../connectDB.js";

export class NhanVien {
  async getNhanVienById(IdNhanVien) {
    const response = await pool
      .request()
      .query(`SELECT * from NhanVien where IdNhanVien = ${IdNhanVien} `);
    return response.recordsets[0];
  }
 
}
