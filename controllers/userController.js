import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { KhachHang } from "../models/KhachHang.js";

const { MAX } = sql;

const userController = {

  getAllInforUser: async (req, res) => {
    try {
     // const response = await pool.request().query(`SELECT * from DichVu `);

      const khachHang = new KhachHang();
      const data = await khachHang.getAllKhachHang();

      return res.status(200).json(data);
     // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  
};

export default userController;
