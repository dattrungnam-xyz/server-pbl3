import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { DonNhapHang } from "../models/DonNhapHang.js";
import { DonNhapChiTiet } from "../models/DonNhapChiTiet.js";


const { MAX } = sql;

const importProductController = {
 

  getAllDonNhapHang: async (req, res) => {
    try {
     

      const donNhapHang = new DonNhapHang();
      const data = await donNhapHang.getAllDonNhapHang();

      return res.status(200).json( data );
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getDonNhapChiTietById: async (req,res)=>
  {
    try {
     
      const id = req.params.id;
      const donNhapChiTiet = new DonNhapChiTiet();
      const data = await donNhapChiTiet.getDonNhapChiTietByIdDonNhap(id);

      return res.status(200).json( data );
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addDonNhapChiTiet: async(req,res)=>{
    try {
      const [date, dataProduct] = req.body;

      const donNhapHang = new DonNhapHang();
      const donNhapChiTiet = new DonNhapChiTiet();

     const data = await donNhapHang.addDonNhapHang(date.dateImportProduct)
     const IdDonNhap = await data[0].Id
      
      const productLength = dataProduct.length
        for(var i = 0; i < productLength; i++)
        {
          await donNhapChiTiet.addDonNhapChiTiet(IdDonNhap,dataProduct[i].IdSanPham,dataProduct[i].SoLuong)
        }
      return res.status(200).json( "add completed succesfully" );
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateDonNhapChiTiet: async (req,res)=>{
    try {
      const id = req.params.id;
      const [date, dataProduct] = req.body;

      const donNhapHang = new DonNhapHang();
      const donNhapChiTiet = new DonNhapChiTiet();

      await donNhapHang.updateDonNhapHang(id,date.dateImportProduct)
      
      const productLength = dataProduct.length
        for(var i = 0; i < productLength; i++)
        {
          await donNhapChiTiet.updateDonNhapChiTiet(dataProduct[i].IdDonNhap,dataProduct[i].IdSanPham,dataProduct[i].SoLuong)
        }
      return res.status(200).json( "update completed succesfully" );
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default importProductController;
