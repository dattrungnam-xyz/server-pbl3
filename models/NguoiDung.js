import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

export class NguoiDung {
  async getAllAccount() {
    const response = await pool.request().query(`SELECT * from NguoiDung`);
    return response.recordsets[0];
  }
  async getAccountById(IdTaiKhoan) {
    const response = await pool.request().query(`SELECT * from NguoiDung where IdTaiKhoan=${IdTaiKhoan}`);
    return response.recordsets[0];
  }
  async updatePassword(IdTaiKhoan,MatKhau) {
    const response = await pool.request().query(`
    UPDATE NguoiDung
    SET MatKhau = '${MatKhau}'
    WHERE IdTaiKhoan=${IdTaiKhoan};
    `);
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
  async checkExistUsername(username) {
    const response = await pool
    .request()
    .query(
      `SELECT * from NguoiDung where TenDangNhap = '${username}'`
    );  
      return response.recordsets[0];
  }
  async addUser(TenDangNhap,MatKhau,LoaiTaiKhoan)
  {
    const response = await pool
    .request()
    .query(
      ` 
      INSERT INTO NguoiDung  (TenDangNhap, MatKhau, LoaiTaiKhoan, Avatar)
      VALUES ('${TenDangNhap}', '${MatKhau}', '${LoaiTaiKhoan}', 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg');
      SELECT SCOPE_IDENTITY() as IdNhanVien
      `
    );  
      return response.recordsets[0];
  }
  async getAllAccountUser() {
    const response = await pool.request().query(`SELECT NguoiDung.IdTaiKhoan,NguoiDung.TenDangNhap,NguoiDung.MatKhau, NguoiDung.LoaiTaiKhoan,KhachHang.HoTen,KhachHang.SoDienThoai,KhachHang.DiaChi,NguoiDung.Avatar from NguoiDung,KhachHang where KhachHang.IdKhachHang = NguoiDung.IdTaiKhoan `);
    return response.recordsets[0];
  }
  async getInforAccountUser(id) {
    const response = await pool.request().query(`SELECT * from NguoiDung,KhachHang where IdTaiKhoan = '${id}' and KhachHang.IdKhachHang = NguoiDung.IdTaiKhoan`);
    return response.recordsets[0];
  }
  async getInforAccountStaff(id) {
    const response = await pool.request().query(`SELECT * from NguoiDung,NhanVien where IdTaiKhoan = '${id}' and NhanVien.IdNhanVien = NguoiDung.IdTaiKhoan`);
    return response.recordsets[0];
  }
}
