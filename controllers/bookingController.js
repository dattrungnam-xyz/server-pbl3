import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { LichDat } from "../models/LichDat.js";
import { ChiTietLichDat } from "../models/ChiTietLichDat.js";
import { NhanVienDaCoLichCat } from "../models/NhanVienDaCoLichCat.js";
import { DanhGia } from "../models/DanhGia.js";
import { NhanVien } from "../models/NhanVien.js";

const { MAX } = sql;

const bookingController = {
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

      const nhanviendacolichcat = new NhanVienDaCoLichCat();

      const busy = await nhanviendacolichcat.getAllInforLichCatByIdNhanVien(
        IdNhanVien,
        NgayCat
      );

      const totalCatemp = TongThoiGianCat / 15;

      let msgError = "";

      for (let u = 0; u < totalCatemp; u++) {
        if (
          await busy.some((item) => {
            if (item.IdGioCat === IdGioCat + u) {
              msgError = `Nhân viên đã có lịch cắt vào lúc ${item.GioCat}`;
            }
            return item.IdGioCat === IdGioCat + u;
          })
        ) {
          return res.status(200).json({
            error: msgError,
          });
        }
      }
      const lichdat = new LichDat();

      const response = await lichdat.addLichDat(IdNhanVien,IdKhachHang,NgayDat,NgayCat,IdGioCat,TongThoiGianCat)

      // // const data = await lichdat.getIdLichDat(IdNhanVien, IdKhachHang, NgayDat, NgayCat, IdGioCat)
      // const data = await lichdat.getIdLichDat(
      //   IdNhanVien,
      //   IdKhachHang,
      //   NgayDat,
      //   NgayCat,
      //   IdGioCat
      // );

      const _IdLich = response[0].IdLich;

      const chitietlichdat = new ChiTietLichDat();

      await IdDichVu.forEach((item) => {
        chitietlichdat.addChiTietLichDat(_IdLich, item);
      });

      var totalCa = TongThoiGianCat / 15;

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
        } else if (IdGioCat + i === 55) {
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
  test: async (req, res) => {
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

      const nhanviendacolichcat = new NhanVienDaCoLichCat();

      const busy = await nhanviendacolichcat.getAllInforLichCatByIdNhanVien(
        7,
        "2023-04-15"
      );

      const totalCatemp = 5;

      let msgError = "";

      for (let u = 0; u < totalCatemp; u++) {
        if (
          await busy.some((item) => {
            if (item.IdGioCat === 46 + u) {
              msgError = `Nhân viên đã có lịch cắt vào lúc ${item.GioCat}`;
            }
            return item.IdGioCat === 46 + u;
          })
        ) {
          return res.status(200).json({
            error: msgError,
          });
        }
      }
      return res.status(200).json(busy);

      return res.status(200).json(busy);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getLichDatByIdNhanVien: async (req, res) => {
    try {
      const id = req.params.id;

      const lichDat = new LichDat();
      const data = await lichDat.getLichDatByIdNhanVien(id);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getLichDatByIdKhachHang: async (req, res) => {
    try {
      const id = req.params.id;

      const lichDat = new LichDat();
      const data = await lichDat.getLichDatByIdKhachHang(id);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async RemoveLichDat(req, res) {
    try {
      const { IdLich, IdNhanVien, NgayCat, IdGioCat, TongThoiGian } = req.body;

      const lichDat = new LichDat();
      const chiTietLichDat = new ChiTietLichDat();
      const danhgia = new DanhGia();

      await danhgia.deleteDanhGiaByIdLich(IdLich);
      await chiTietLichDat.removeChiTietLichDat(IdLich);
      await lichDat.removeLichDatByIdLich(IdLich);

      var totalCa = TongThoiGian / 15;
      const totalCatemp = TongThoiGian / 15;

      const nhanviendacolichcat = new NhanVienDaCoLichCat();

      for (let i = 0; i < totalCa; i++) {
        nhanviendacolichcat.removeNhanVienDaCoLichCat(
          IdNhanVien,
          IdGioCat + i,
          NgayCat
        );
        if (IdGioCat + i === 21) {
          totalCa -= 5;
        } else if (IdGioCat + i === 44) {
          totalCa -= 3;
        } else if (IdGioCat + i === 55) {
          totalCa -= 99;
        } else {
        }
      }

      return res.status(200).json({ message: "delete succesfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllTime: async (req, res) => {
    try {
      const response = await pool.request().query(`SELECT * from GioCat `);
      return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  ratingService: async (req, res) => {
    try {
      const { IdLich, SoSaoNV, SoSaoDV, MoTaNV, MoTaDV } = req.body;
      const danhgia = new DanhGia();
      const lichdat = new LichDat();

      await lichdat.setStatusRating(IdLich);
      await danhgia.AddDanhGia(IdLich, SoSaoNV, SoSaoDV, MoTaNV, MoTaDV);

      return res.status(200).json({ message: "Rating completed successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllRatingService: async (req, res) => {
    try {
      const danhgia = new DanhGia();
      const lichdat = new LichDat();

      const dataDanhGia = await danhgia.getAllDanhGia();

      const length = await dataDanhGia.length;

      for (var k = 0; k < length; k++) {
        const inforDetail = await lichdat.getInforDetailLichDatByIdLich(
          dataDanhGia[k].IdLich
        );
        dataDanhGia[k] = await { ...dataDanhGia[k], inforDetail: inforDetail };
      }

      return res.status(200).json(dataDanhGia);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllInforBooking: async (req, res) => {
    try {
      const lichDat = new LichDat();
      const data = await lichDat.getAllInforLichDat();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getInforBookingByIdLich: async (req, res) => {
    try {
      const id = req.params.id;

      const lichDat = new LichDat();
      const data = await lichDat.getInforLichDatByIdLich(id)
     
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default bookingController;
