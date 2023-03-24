import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const serviceController = {
  getService: async (req, res) => {
    try {
    
      const response = await pool
        .request()
        .query(
          `SELECT * from DichVu `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addService: async (req, res) => {
    try {
      const { phone, name, avatar, address } = req.body;
      const id = req.params.id;
      
      const response = await pool
        .request()
        .input("IdUser", sql.Int, id)
        .input("HoTen", sql.NVarChar(50), name)
        .input("SoDienThoai", sql.NVarChar(11), phone)
        .input("DiaChi", sql.NVarChar(MAX), address)
        .input("Avatar", sql.NVarChar(MAX), avatar)
        .execute("UpdateInforUser");

      return res
        .status(200)
        .json({ error: "", message: "Update completed successfully!" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  updateService: async (req, res) => {
    try {
      const { phone, name, avatar, address } = req.body;
      const id = req.params.id;
      
      const response = await pool
        .request()
        .input("IdUser", sql.Int, id)
        .input("HoTen", sql.NVarChar(50), name)
        .input("SoDienThoai", sql.NVarChar(11), phone)
        .input("DiaChi", sql.NVarChar(MAX), address)
        .input("Avatar", sql.NVarChar(MAX), avatar)
        .execute("UpdateInforUser");

      return res
        .status(200)
        .json({ error: "", message: "Update completed successfully!" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};

export default serviceController;
