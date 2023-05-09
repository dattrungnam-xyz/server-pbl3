import pool from "../connectDB.js";

export class NhanVien {
  async getNhanVienById(IdNhanVien) {
    const response = await pool
      .request()
      .query(`SELECT * from NhanVien where IdNhanVien = ${IdNhanVien} `);
    return response.recordsets[0];
  }
  async getAllNhanVien() {
    const response = await pool
      .request()
      .query(`SELECT * from NhanVien,NguoiDung where NhanVien.LoaiNhanVien = '1' and NguoiDung.IdTaiKhoan = NhanVien.IdNhanVien `);
    return response.recordsets[0];
  }
  async updateInforStaffById(
    DiaChi,
    HoTen,
    Id,
    IdNhanVien,
    LoaiNhanVien,
    NamKinhNghiem,
    SoDienThoai,
    Luong1Gio
  ) {
    const response = await pool
      .request()
      .query(`
      UPDATE NhanVien
      SET HoTen = N'${HoTen}', DiaChi = N'${DiaChi}', SoDienThoai = N'${SoDienThoai}',LoaiNhanVien = N'${LoaiNhanVien}', NamKinhNghiem = ${NamKinhNghiem} 
      WHERE IdNhanVien = ${IdNhanVien};
      `);
    return response.recordsets[0];
  }
  async getAllInforNhanVien() {
    const response = await pool
      .request()
      .query(`SELECT * from NhanVien`);
    return response.recordsets[0];
  }
  async addNhanVien(IdNhanVien, HoTen, SoDienThoai, DiaChi,NamKinhNghiem,LoaiNhanVien) {
    const response = await pool
      .request()
      .query(`
      INSERT INTO NhanVien (IdNhanVien, HoTen, SoDienThoai, DiaChi,NamKinhNghiem,LoaiNhanVien)
      VALUES (${IdNhanVien}, N'${HoTen}', '${SoDienThoai}', N'${DiaChi}',${NamKinhNghiem} ,'${LoaiNhanVien}');
      
      `);
    return response.recordsets[0];
  }
  async removeNhanVien(IdNhanVien)
  {
    const response = await pool
    .request()
    .query(`UPDATE NhanVien
    SET An = 1
    WHERE IdNhanVien = ${IdNhanVien};`);
  return response.recordsets[0];
  }
}
