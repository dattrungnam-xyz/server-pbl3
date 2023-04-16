import pool from "../connectDB.js";

export class NhanVienDaCoLichCat {
  async addNhanVienDaCoLichCat(IdNhanVien, IdGioCat, NgayCat) {
    const response = await pool.request().query(
      `
        INSERT INTO NhanVienDaCoLichCat (IdNhanVien, IdGioCat,NgayCat)
        VALUES (${IdNhanVien}, ${IdGioCat}, '${NgayCat}');
        `
    );
  }

  async removeNhanVienDaCoLichCat(IdNhanVien, IdGioCat, NgayCat) {
    const response = await pool.request().query(
      `
      DELETE FROM NhanVienDaCoLichCat WHERE IdNhanVien = ${IdNhanVien} and IdGioCat = ${IdGioCat} and NgayCat = '${NgayCat}' ;
        `
    );
  }

  async getAllInforLichCatByIdNhanVien(IdNhanVien, NgayCat) {
    const response = await pool.request().query(
      `
     


      Select NVDCLC.Id, NVDCLC.NgayCat, NVDCLC.IdGioCat,GC.GioCat, NVDCLC.IdNhanVien FROM NhanVienDaCoLichCat as NVDCLC, GioCat as GC WHERE NVDCLC.IdNhanVien = ${IdNhanVien} and NVDCLC.NgayCat = '${NgayCat}' and GC.IdGioCat = NVDCLC.IdGioCat
        `
    );
    return response.recordsets[0];
  }
}
