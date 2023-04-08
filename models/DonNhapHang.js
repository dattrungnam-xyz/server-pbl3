import pool from "../connectDB.js";

export class DonNhapHang {
    async getAllDonNhapHang(){
        const response = await pool.request().query(`SELECT * from DonNhapHang order by NgayNhap desc`);
        return response.recordsets[0];
    }
    async updateDonNhapHang(IdDonNhap,NgayNhap){
        const response = await pool.request().query(`
        UPDATE DonNhapHang
        SET NgayNhap = '${NgayNhap}'
        WHERE IdDonNhap = ${IdDonNhap};
        `);
        return response.recordsets[0];

    }
    async addDonNhapHang(NgayNhap){
        const response = await pool.request().query(`
        INSERT INTO DonNhapHang (NgayNhap)
        VALUES ('${NgayNhap}');
        SELECT SCOPE_IDENTITY() as Id
        `);
        return response.recordsets[0];

    }
    

}
