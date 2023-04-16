import pool from "../connectDB.js";

export class ChiTietMuaSanPhamBanKem {
  async getAllChiTietMuaSanPhamBanKem(IdHoaDon) {
    const response = await pool.request().query(
      `
        select CTMSPBK.IdHoaDon, CTMSPBK.IdSanPham, CTMSPBK.SoLuong, SPBK.GiaBan, SPBK.TenSanPham from ChiTietMuaSanPhamBanKem as CTMSPBK ,SanPhamBanKem as SPBK
        where IdHoaDon = ${IdHoaDon}
        and CTMSPBK.IdSanPham = SPBK.IdSanPham
        `
    );
    return response.recordsets[0];
  }

  async addChiTietMuaSanPhamBanKem(IdHoaDon,IdSanPham,SoLuong) {
    const response = await pool.request().query(
      `
      INSERT INTO ChiTietMuaSanPhamBanKem (IdHoaDon, IdSanPham, SoLuong)
      VALUES (${IdHoaDon},${IdSanPham},${SoLuong});
        `
    );
    return response.recordsets[0];
  }
  async getCountProductSellById(Id){
    const response = await pool.request().query(`
    SELECT IdSanPham, Sum(SoLuong) as SoLuongDaBan
    FROM ChiTietMuaSanPhamBanKem 
    where IdSanPham = ${Id}
    GROUP BY IdSanPham;
    `);
    return response.recordsets[0];
}
}