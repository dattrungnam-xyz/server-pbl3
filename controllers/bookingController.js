import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const timeController = {
  getAllTime: async (req, res) => {
    try {
    
      const response = await pool
        .request()
        .query(
          `SELECT * from GioCat `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // getAllStaffNotBusy: async (req, res) => {
  //   try {
    
  //     const response = await pool
  //       .request()
  //       .query(
  //         `SELECT * from NhanVien where LoaiNhanVien = '1' and IdNhanVien not  `
  //       );
  //     return res.status(200).json(response.recordsets[0]);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // },

  
};

export default timeController;
