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
  async getCountDanhGiaByIdNhanVien(IdNhanVien) {
    const response = await pool.request().query(`
        
    select Count(*) as SoLuotDanhGia from DanhGia as DG, LichDat as LD where LD.IdLich = DG.IdLich and LD.IdNhanVien = ${IdNhanVien}
            
        `);
    return response.recordsets[0];
  }
  async getSumDanhGiaByIdNhanVien(IdNhanVien) {
    const response = await pool.request().query(`
        
    select Sum(SoSaoNV) as TongSoSao from DanhGia as DG, LichDat as LD where LD.IdLich = DG.IdLich and LD.IdNhanVien = ${IdNhanVien}
            
        `);
    return response.recordsets[0];
  }
}
