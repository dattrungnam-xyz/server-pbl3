import pool from "../connectDB.js";

export class DanhGia {
  async deleteDanhGiaByIdLich(IdLich) {
    const response = await pool
      .request()
      .query(`DELETE FROM DanhGia WHERE IdLich=${IdLich};`);
    return response.recordsets[0];
  }
  async AddDanhGia(IdLich, SoSaoNV, SoSaoDV, MoTaNV, MoTaDV) {
    const response = await pool.request().query(`
        INSERT INTO DanhGia (IdLich, SoSaoNV, SoSaoDV, MoTaNV,MoTaDV)
        VALUES (${IdLich}, ${SoSaoNV}, ${SoSaoDV}, N'${MoTaNV}',N'${MoTaDV}');`);
    return response.recordsets[0];
  }
  async getAllDanhGia() {
    const response = await pool.request().query(`
        
            select * from DanhGia
            
        `);
    return response.recordsets[0];
  }
}
