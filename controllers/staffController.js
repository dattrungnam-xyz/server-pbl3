import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { NhanVien } from "../models/NhanVien.js";
import { DanhGia } from "../models/DanhGia.js";

const { MAX } = sql;

const staffController = {
  getStaffBarBer: async (req, res) => {
    try {
      const nhanVien = new NhanVien();
      const data = await nhanVien.getAllNhanVien();
      let length =  await data.length;
      const danhGia = new DanhGia();

      for (let i = 0 ; i < length; i++)
      {
        const temp = await danhGia.getSumDanhGiaByIdNhanVien(data[i].IdNhanVien)
        data[i] = await {...data[i], TongSoSao: temp[0]}
      }
      for (let i = 0 ; i < length; i++)
      {
        const temp = await danhGia.getCountDanhGiaByIdNhanVien(data[i].IdNhanVien)
        data[i] = await {...data[i], TongSoLuotDanhGia: temp[0]}
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllStaff: async (req, res) => {
    try {
     


      const nhanVien = new NhanVien()
      const data = await nhanVien.getAllInforNhanVien()

      let length =  await data.length;
      const danhGia = new DanhGia();

      for (let i = 0 ; i < length; i++)
      {
        const temp = await danhGia.getSumDanhGiaByIdNhanVien(data[i].IdNhanVien)
        data[i] = await {...data[i], TongSoSao: temp[0]}
      }
      for (let i = 0 ; i < length; i++)
      {
        const temp = await danhGia.getCountDanhGiaByIdNhanVien(data[i].IdNhanVien)
        data[i] = await {...data[i], TongSoLuotDanhGia: temp[0]}
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllStaffNotBusy: async (req, res) => {
    try {
      const { IdGioCat, Thu, Ca, Day } = req.params;
      const response = await pool
        .request()
        .query(
          `SELECT * from NhanVien where LoaiNhanVien = '1' and IdNhanVien not in (Select IdNhanVien from NhanVienDaCoLichCat where IdGioCat = '${IdGioCat}' and NgayCat ='${Day}' ) and IdNhanVien in (Select IdNhanVien from CaLam where Thu = '${Thu}' and Ca = '${Ca}' and AnCaLam = 0 ) `
        );
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateInforStaff: async (req, res) => {
    try {
      const {
        DiaChi,
        HoTen,
        Id,
        IdNhanVien,
        LoaiNhanVien,
        NamKinhNghiem,
        SoDienThoai,
        Luong1Gio,
      } = req.body;

      const nhanVien = new NhanVien();

      nhanVien.updateInforStaffById(
        DiaChi,
        HoTen,
        Id,
        IdNhanVien,
        LoaiNhanVien,
        NamKinhNghiem,
        SoDienThoai,
        Luong1Gio
      );
      return res.status(200).json({message: "update completed successfully"});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  checkBusy: async (req, res) => {
    try {
     
      const nhanVien = new NhanVien();

     
      return res.status(200).json({message: "update completed successfully"});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  removeStaff: async (req, res) => {
    try {
      const id = req.params.id;
      const nhanVien = new NhanVien();
      await nhanVien.removeNhanVien(id)
     
      return res.status(200).json({message: "update completed successfully"});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  
};

export default staffController;
