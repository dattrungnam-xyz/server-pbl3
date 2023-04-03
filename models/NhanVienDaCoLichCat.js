import pool from "../connectDB.js";

export class NhanVienDaCoLichCat {
  async addNhanVienDaCoLichCat(IdNhanVien, IdGioCat,NgayCat) {
    const response = await pool.request().query(
      `
        INSERT INTO NhanVienDaCoLichCat (IdNhanVien, IdGioCat,NgayCat)
        VALUES (${IdNhanVien}, ${IdGioCat}, '${NgayCat}');
        `
    );
   
  }
  
  async removeNhanVienDaCoLichCat(IdNhanVien, IdGioCat,NgayCat) {
    const response = await pool.request().query(
      `
      DELETE FROM NhanVienDaCoLichCat WHERE IdNhanVien = ${IdNhanVien} and IdGioCat = ${IdGioCat} and NgayCat = '${NgayCat}' ;
        `
    );
   
  }
}
