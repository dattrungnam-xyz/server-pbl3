import pool from "../connectDB.js";

export class SanPhamBanKem {
  async getAllSanPhamBanKem() {
    const response = await pool.request().query(`SELECT * from SanPhamBanKem`);
    return response.recordsets[0];
  }
  async removeProduct(id) {
    const response = await pool.request().query(`
    UPDATE SanPhamBanKem
    SET An = 1
    WHERE IdSanPham = ${id} ;
    
    `);
    return response.recordsets[0];
  }
  async getProductByIdProduct(idProduct) {
    const response = await pool
      .request()
      .query(`SELECT * from SanPhamBanKem where IdSanPham = ${idProduct}`);
    return response.recordsets[0];
  }
  async addProduct(TenSanPham, GiaBan, GiaNhap) {
    const response = await pool.request()
      .query(`INSERT INTO SanPhamBanKem (TenSanPham, GiaBan, GiaNhap)
    VALUES (N'${TenSanPham}', ${GiaBan}, ${GiaNhap});`);
    return response.recordsets[0];
  }
  async updateProductById(id,TenSanPham,GiaBan,GiaNhap){
    const response = await pool.request()
      .query(`UPDATE SanPhamBanKem
      SET TenSanPham = N'${TenSanPham}', GiaBan = ${GiaBan}, GiaNhap = ${GiaNhap}
      WHERE IdSanPham=${id};`);
    return response.recordsets[0];
  }

}
