import pool from "../connectDB.js";

export class NhanVien {
  async getNhanVienById(IdNhanVien) {
    const response = await pool
      .request()
      .query(`SELECT * from NhanVien where IdNhanVien = ${IdNhanVien} `);
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
}
