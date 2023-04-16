import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { NhanVien } from "../models/NhanVien.js";
import { CaLam } from "../models/CaLam.js";

const { MAX } = sql;

const shiftController = {
  getAllShift: async (req, res) => {
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);

      const nhanVien = new NhanVien();
      const caLam = new CaLam();

      const data = await caLam.getAllCaLam();
      const length = await data.length;
      for (var i = 0; i < length; i++) {
        const inforStaff = await nhanVien.getNhanVienById(data[i].IdNhanVien);
        data[i] = { ...data[i], inforStaff: inforStaff };
      }
      return res.status(200).json(data);
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateShift: async (req, res) => {
    try {
      const shiftData = req.body;
      const caLam = new CaLam();

      const length = shiftData.length;
      for(var j = 0; j < length; j++) {
        await caLam.updateCaLam(shiftData[j].IdNhanVien,shiftData[j].Thu,shiftData[j].Ca,shiftData[j].AnCaLam)
      }

      return res.status(200).json({message: "update completed successfully"});

    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default shiftController;
