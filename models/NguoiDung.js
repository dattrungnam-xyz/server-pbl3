import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

export class NguoiDung {
  constructor(TenDangNhap, MatKhau, LoaiTaiKhoan) {
    this.TenDangNhap = TenDangNhap;
    this.MatKhau = MatKhau;
    this.LoaiTaiKhoan = LoaiTaiKhoan;
  }

  async getAllAccount() {
    const response = await pool.request().query(`SELECT * from NguoiDung`);
    return response.recordsets[0];
  }
  async getUserAccount() {
    const response = await pool
      .request()
      .query(`SELECT * from NguoiDung where LoaiTaiKhoan = 'user'`);
    return response.recordsets[0];
  }
  async getStaffAccount() {
    const response = await pool
      .request()
      .query(
        `SELECT * from NguoiDung where LoaiTaiKhoan = 'admin' or LoaiTaiKhoan='staff`
      );
    return response.recordsets[0];
  }
}
