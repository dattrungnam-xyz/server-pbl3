import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { DichVu } from "../models/DichVu.js";

const { MAX } = sql;

const serviceController = {

  getService: async (req, res) => {
    try {
     // const response = await pool.request().query(`SELECT * from DichVu `);

      const dichVu = new DichVu();
      const data = await dichVu.getAllDichVu();

      return res.status(200).json(data);
     // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  removeService: async (req, res) => {
    try {
     // const response = await pool.request().query(`SELECT * from DichVu `);
      const id = req.params.id;
      const dichVu = new DichVu();
      await dichVu.removeDichVu(id);
      
      return res.status(200).json({message:"remove successfully"});
     // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getServiceById: async (req, res) => {
    try {
      const id = req.params.id;
      // const response = await pool
      //   .request()
      //   .query(`SELECT * from DichVu where IdDichVu = '${id}'`);

      const dichVu = new DichVu();
      const data = await dichVu.getDichVuById(id);

      return res.status(200).json(data);
     // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getServiceByIdLich: async (req, res) => {
    try {
      const id = req.params.id;
      // const response = await pool
      //   .request()
      //   .query(`SELECT * from DichVu where IdDichVu = '${id}'`);

      const dichVu = new DichVu();
      const data = await dichVu.getDichVuByIdLich(id);

      return res.status(200).json(data);
     // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addService: async (req, res) => {
    try {
      const {
        Avatar="",
        Description="",
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
