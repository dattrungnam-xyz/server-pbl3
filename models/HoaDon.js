import pool from "../connectDB.js";

export class HoaDon {
  async getAllHoaDon() {
    const response = await pool
      .request()
      .query(`SELECT * from HoaDon order by NgayTaoHoaDon desc`);
    return response.recordsets[0];
  }
  async addHoaDonNoIdLich(TongTien, NgayTaoHoaDon, GioTaoHoaDon) {
    const response = await pool.request()
      .query(`insert into HoaDon ( NgayTaoHoaDon, TongTien, GioTaoHoaDon)
        VALUES ( '${NgayTaoHoaDon}', ${TongTien}, '${GioTaoHoaDon}');
        SELECT SCOPE_IDENTITY() as IdHoaDon
        `);
    return response.recordsets[0];
  }
  async addHoaDonIdLich(IdLich, TongTien, NgayTaoHoaDon, GioTaoHoaDon) {
    const response = await pool.request()
      .query(`insert into HoaDon (IdLich, NgayTaoHoaDon, TongTien, GioTaoHoaDon)
        VALUES ( ${IdLich},'${NgayTaoHoaDon}', ${TongTien}, '${GioTaoHoaDon}');
        SELECT SCOPE_IDENTITY() as IdHoaDon
        `);
    return response.recordsets[0];
  }
  async getProfit() {
    const response = await pool.request().query(`SELECT Top(30) NgayTaoHoaDon, 
        SUM (TongTien) as DoanhThu
        FROM HoaDon 
        GROUP BY NgayTaoHoaDon
        order by NgayTaoHoaDon asc `);
    return response.recordsets[0];
  }
}
