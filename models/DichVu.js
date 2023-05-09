import pool from "../connectDB.js";

export class DichVu {
    async getAllDichVu(){
        const response = await pool.request().query(`SELECT * from DichVu `);
        return response.recordsets[0];
    }

    async getDichVuById(id){
        const response = await pool
        .request()
        .query(`SELECT * from DichVu where IdDichVu = '${id}'`);
        return response.recordsets[0];
    }

  async getDichVuByIdLich(IdLich) {
    const response = await pool
      .request()

      .query(
        `SELECT * from DichVu ,ChiTietLichDat where IdLich = ${IdLich} and DichVu.IdDichVu = ChiTietLichDat.IdDichVu  `
      );
    return response.recordsets[0];
  }
  async removeDichVu(id){
    const response = await pool
    .request()
    .query(`UPDATE DichVu
    SET An = 1
    WHERE IdDichVu = ${id};`);
    return response.recordsets[0];
}
}
