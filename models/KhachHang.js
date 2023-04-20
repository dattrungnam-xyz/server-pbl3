import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

export class KhachHang{
    async getAllKhachHang() {
        const response = await pool
          .request()
    
          .query(
            `SELECT * from KhachHang `
          );
        return response.recordsets[0];
      }
      async getKhachHangById(id) {
        const response = await pool
          .request()
    
          .query(
            `SELECT * from KhachHang where IdKhachHang = ${id}`
          );
        return response.recordsets[0];
      }
}