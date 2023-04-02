import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { LichDat } from "../models/LichDat.js";
import { ChiTietLichDat } from "../models/ChiTietLichDat.js";
import { NhanVienDaCoLichCat } from "../models/NhanVienDaCoLichCat.js";

const { MAX } = sql;

const timeController = {
  getAllTime: async (req, res) => {
    try {
      const response = await pool.request().query(`SELECT * from GioCat `);
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  bookingService: async (req, res) => {
    try {
      const {
        IdDichVu,
        NgayCat,
        NgayDat,
        IdGioCat,
        IdNhanVien,
        IdKhachHang,
        Ca,
        ThuNgay,
        TongThoiGianCat,
      } = req.body;

      const response = await pool.request()
        .query(`INSERT INTO LichDat (IdNhanVien, IdKhachHang, NgayDat, NgayCat,IdGioCat)
        VALUES (${IdNhanVien}, ${IdKhachHang}, '${NgayDat}', '${NgayCat}',${IdGioCat});`);

   
      const lichdat = new LichDat();

      // const data = await lichdat.getIdLichDat(IdNhanVien, IdKhachHang, NgayDat, NgayCat, IdGioCat)
      const data = await lichdat.getIdLichDat(
        IdNhanVien,
        IdKhachHang,
        NgayDat,
        NgayCat,
        IdGioCat
      );

  

      const _IdLich = data[0].IdLich;

       const chitietlichdat = new ChiTietLichDat();

       await IdDichVu.forEach((item) => {
         chitietlichdat.addChiTietLichDat(_IdLich, item);
       });

      var totalCa = TongThoiGianCat / 15;
      const totalCatemp = TongThoiGianCat / 15;
    

      const nhanviendacolichcat = new NhanVienDaCoLichCat();
      
      for (let i = 0; i < totalCa; i++) {
        nhanviendacolichcat.addNhanVienDaCoLichCat(
          IdNhanVien,
          IdGioCat + i,
          NgayCat
        );
        if (IdGioCat + i === 21) {
          totalCa -= 5;
        } else if (IdGioCat + i === 44) {
          totalCa -= 3;
        } else if (IdGioCat + i === 55){
          totalCa -= 99;
        } else {
          
        }

      }
      
      return res
        .status(200)
        .json({ error: "", message: "Đặt lịch thành công" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default timeController;
