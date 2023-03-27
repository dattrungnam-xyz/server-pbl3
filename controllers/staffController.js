import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const staffController = {
  getStaffBarBer: async (req, res) => {
    try {
    
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien,TaiKhoan where NhanVien.LoaiNhanVien = '1' and TaiKhoan.IdTaiKhoan = NhanVien.IdNhanVien `
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
      const {IdGioCat} = req.params
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien where LoaiNhanVien = '1' and IdNhanVien not in (Select IdNhanVien from NhanVienDaCoLichCat where IdGioCat = '${IdGioCat}')  `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  
};

export default staffController;
