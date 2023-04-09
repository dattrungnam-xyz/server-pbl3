import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { HoaDon } from "../models/HoaDon.js";
import { ChiTietMuaSanPhamBanKem } from "../models/ChiTietMuaSanPhamBanKem.js";
import { DichVu } from "../models/DichVu.js";
import { LichDat } from "../models/LichDat.js";

const { MAX } = sql;

const billController = {
  getAllBill: async (req, res) => {
    try {
      const hoaDon = new HoaDon();

      const data = await hoaDon.getAllHoaDon();
      const dataLength = await data.length;

      const chiTietMuaSanPhamBanKem = new ChiTietMuaSanPhamBanKem();

      for (var i = 0; i < dataLength; i++) {
        const detailBill =
          await chiTietMuaSanPhamBanKem.getAllChiTietMuaSanPhamBanKem(
            data[i].IdHoaDon
          );
        data[i] = await { ...data[i], detailBill: detailBill };
      }
      const dichVu = new DichVu();
      for (var i = 0; i < dataLength; i++) {
        if (data[i].IdLich) {
          const detailService = await dichVu.getDichVuByIdLich(data[i].IdLich);
          data[i] = await { ...data[i], detailService: detailService };
        }
      }

      return res.status(200).json(data);
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  addBill: async (req, res) => {
    try {
      const [inforBill, productData] = req.body;

      const hoaDon = new HoaDon();

      if (inforBill.IdLich) {
        const data = await hoaDon.addHoaDonIdLich(
          inforBill.IdLich,
          inforBill.TongTien,
          inforBill.NgayTaoHoaDon,
          inforBill.GioTaoHoaDon
        );
        const IdHoaDon = await data[0].IdHoaDon;

        const dataLength = await productData.length;

        const chiTietMuaSanPhamBanKem = new ChiTietMuaSanPhamBanKem();
        const lichDat = new LichDat();

        
        await lichDat.updateThanhToan(inforBill.IdLich);

        for (var i = 0; i < dataLength; i++) {
          await chiTietMuaSanPhamBanKem.addChiTietMuaSanPhamBanKem(
            IdHoaDon,
            productData[i].IdSanPham,
            productData[i].SoLuong
          );
        }
      } else {
        const data = await hoaDon.addHoaDonNoIdLich(
          inforBill.TongTien,
          inforBill.NgayTaoHoaDon,
          inforBill.GioTaoHoaDon
        );
        const IdHoaDon = await data[0].IdHoaDon;

        const dataLength = await productData.productData.length;

        const chiTietMuaSanPhamBanKem = new ChiTietMuaSanPhamBanKem();

        for (var j = 0; j < dataLength; j++) {
          await chiTietMuaSanPhamBanKem.addChiTietMuaSanPhamBanKem(
            IdHoaDon,
            productData.productData[j].IdSanPham,
            productData.productData[j].SoLuong
          );
        }
      }

      return res.status(200).json({ message: "add completed successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default billController;
