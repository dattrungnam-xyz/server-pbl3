import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const serviceController = {
  getService: async (req, res) => {
    try {
      const response = await pool.request().query(`SELECT * from DichVu `);
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getServiceById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await pool
        .request()
        .query(`SELECT * from DichVu where IdDichVu = '${id}'`);
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addService: async (req, res) => {
    try {
      const {
        Avatar,
        Description,
        GiaTien,

        LoaiDichVu,
        TenDichVu,
        ThoiGian,
        TienCongNhanVien,
      } = req.body;

      
      const response = await pool.request()
        .query(`INSERT INTO DichVu (Avatar, Description, LoaiDichVu, TenDichVu,ThoiGian,TienCongNhanVien,GiaTien)
      VALUES (N'${Avatar}', N'${Description}', ${LoaiDichVu}, N'${TenDichVu}',${ThoiGian},${TienCongNhanVien},${GiaTien});`);

      return res
        .status(200)
        .json({ error: "", message: "Add service completed successfully!" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  updateService: async (req, res) => {
    try {
      const {
        Avatar,
        Description,
        GiaTien,

        LoaiDichVu,
        TenDichVu,
        ThoiGian,
        TienCongNhanVien,
      } = req.body;
      const id = req.params.id;
      const response = await pool.request()
        .query(`UPDATE DichVu
        SET Avatar = N'${Avatar}', Description = N'${Description}', GiaTien = ${GiaTien}, ThoiGian = ${ThoiGian}, LoaiDichVu = ${LoaiDichVu}, TienCongNhanVien = ${TienCongNhanVien}, TenDichVu =N'${TenDichVu}'
        WHERE IdDichVu = ${id};`);

      return res
        .status(200)
        .json({ error: "", message: "Update service completed successfully!" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};

export default serviceController;
