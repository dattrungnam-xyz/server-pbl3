import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { SanPhamBanKem } from "../models/SanPhamBanKem.js";
import { DonNhapChiTiet } from "../models/DonNhapChiTiet.js";
import { ChiTietMuaSanPhamBanKem } from "../models/ChiTietMuaSanPhamBanKem.js";

const { MAX } = sql;

const productController = {

  getAllProduct: async (req, res) => {
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);

      const sanPhamBanKem = new SanPhamBanKem();
      const donNhapChiTiet = new DonNhapChiTiet();
      const chiTietMuaSanPhamBanKem = new ChiTietMuaSanPhamBanKem();

      const data = await sanPhamBanKem.getAllSanPhamBanKem();

      const length = await data.length
      for(let i = 0; i < length; i ++)
      {
        const soLuongNhap = await donNhapChiTiet.getCountProductImportById(data[i].IdSanPham)

        data[i] = await {
          ...data[i],
          SoLuongNhap: soLuongNhap[0]
        }
        
      }

      for(let i = 0; i < length; i ++)
      {
        const soLuongBan = await chiTietMuaSanPhamBanKem.getCountProductSellById(data[i].IdSanPham)
        data[i] = await {
          ...data[i],
          SoLuongDaBan: soLuongBan[0]
        }
        
      }
      

      return res.status(200).json(data);
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getProductByIdProduct: async (req, res) => {
  
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);
      const id = req.params.id;

      const sanPhamBanKem = new SanPhamBanKem();

      const data = await sanPhamBanKem.getProductByIdProduct(id);

      return res.status(200).json(data);
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  addProduct: async (req,res) =>{
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);
      const {TenSanPham,GiaBan,GiaNhap} = req.body;


      const sanPhamBanKem = new SanPhamBanKem();

      const data = await sanPhamBanKem.addProduct(TenSanPham,GiaBan,GiaNhap);

      return res.status(200).json({message: "Add product completed successfully"});
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateProduct : async (req,res)=>{
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);
      const {TenSanPham,GiaBan,GiaNhap} = req.body;
      const id = req.params.id;

      const sanPhamBanKem = new SanPhamBanKem();

      const data = await sanPhamBanKem.updateProductById(id,TenSanPham,GiaBan,GiaNhap);

      return res.status(200).json({message: "Update product completed successfully"});
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  removeProduct: async (req,res)=>{
    try {
      // const response = await pool.request().query(`SELECT * from DichVu `);
    
      const id = req.params.id;

      const sanPhamBanKem = new SanPhamBanKem();

      await sanPhamBanKem.removeProduct(id);

      return res.status(200).json({message: "delete product completed successfully"});
      // return res.status(200).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default productController;
