import pool from "../connectDB.js";

export class DonNhapChiTiet {
  async getDonNhapChiTietByIdDonNhap(Id) {
    const response = await pool
      .request()
      .query(
        `SELECT DNCT.IdDonNhap, DNCT.IdSanPham, DNCT.SoLuong,SPBK.GiaBan, SPBK.GiaNhap, SPBK.TenSanPham from DonNhapChiTiet as DNCT,SanPhamBanKem as SPBK where DNCT.IdDonNhap = ${Id} and DNCT.IdSanPham = SPBK.IdSanPham `
      );
    return response.recordsets[0];
  }
  async updateDonNhapChiTiet(IdDonNhap, IdSanPham, SoLuong) {
    const response = await pool.request().query(`
            UPDATE DonNhapChiTiet
            SET SoLuong = ${SoLuong}
            WHERE IdDonNhap = ${IdDonNhap} and IdSanPham = ${IdSanPham};
            `);
  }
  async addDonNhapChiTiet(IdDonNhap, IdSanPham, SoLuong) {
    const response = await pool.request().query(`
            INSERT INTO DonNhapChiTiet (IdDonNhap, IdSanPham, SoLuong)
            VALUES (${IdDonNhap}, ${IdSanPham}, ${SoLuong});
            `);
  }
  async getCountProductImportById(Id) {
    const response = await pool
      .request()
      .query(
        `
        SELECT IdSanPham, Sum(SoLuong) as SoLuongNhap
        FROM DonNhapChiTiet 
      where IdSanPham = ${Id}
        GROUP BY IdSanPham;
        `
      );
    return response.recordsets[0];
  }
}
