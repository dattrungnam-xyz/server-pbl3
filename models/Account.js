import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

export class Account {
  constructor(TenDangNhap, MatKhau, LoaiTaiKhoan) {
    this.TenDangNhap = TenDangNhap;
    this.MatKhau = MatKhau;
    this.LoaiTaiKhoan = LoaiTaiKhoan;
  }

  async getAllAccount() {
    const response = await pool.request().query(
         `SELECT * from TaiKhoan`
    //   `SELECT TaiKhoan.IdTaiKhoan,TaiKhoan.TenDangNhap,TaiKhoan.MatKhau, TaiKhoan.LoaiTaiKhoan,KhachHang.HoTen,KhachHang.SoDienThoai,KhachHang.DiaChi,KhachHang.Avatar from TaiKhoan,KhachHang where KhachHang.IdUser = TaiKhoan.IdTaiKhoan `
    );
    return response.recordsets[0];
  }
}
