import pool from "../connectDB.js";

export class ChiTietLichDat {
  async addChiTietLichDat(IdLich, IdDichVu) {
    const response = await pool.request().query(
      `
        INSERT INTO ChiTietLichDat (IdLich, IdDichVu)
        VALUES (${IdLich}, ${IdDichVu} );
        `
    );
   
  }
}