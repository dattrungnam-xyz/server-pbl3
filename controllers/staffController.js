import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const staffController = {
  getStaffBarBer: async (req, res) => {
    try {
    
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien,NguoiDung where NhanVien.LoaiNhanVien = '1' and NguoiDung.IdTaiKhoan = NhanVien.IdNhanVien `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllStaff: async (req, res) => {
    try {
    
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllStaffNotBusy: async (req, res) => {
    try {
      const {IdGioCat,Thu,Ca,Day} = req.params
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien where LoaiNhanVien = '1' and IdNhanVien not in (Select IdNhanVien from NhanVienDaCoLichCat where IdGioCat = '${IdGioCat}' and NgayCat ='${Day}' ) and IdNhanVien in (Select IdNhanVien from CaLam where Thu = '${Thu}' and Ca = '${Ca}')  `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  
};

export default staffController;
