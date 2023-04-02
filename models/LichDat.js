import pool from "../connectDB.js";

export class LichDat {
  async getIdLichDat(IdNhanVien, IdKhachHang, NgayDat, NgayCat, IdGioCat) {
    const response = await pool
      .request()
   
      .query(
        `SELECT * from LichDat where IdNhanVien = ${IdNhanVien} and IdGioCat = ${IdGioCat} and IdKhachHang = ${IdKhachHang} and NgayCat = '${NgayCat}' and NgayDat = '${NgayDat}'`
      );
    return response.recordsets[0];
  }
}
