import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import { NguoiDung } from "../models/NguoiDung.js";
import { KhachHang } from "../models/KhachHang.js";
import { NhanVien } from "../models/NhanVien.js";
const { MAX } = sql;

const accountController = {
  getAllAccount: async (req, res) => {
    try {
      // const response = await pool
      //   .request()
      //   .query(
      //     `SELECT * from NguoiDung`
      //   );
       const account = new NguoiDung();
      const khachHang = new KhachHang();
      const nhanVien = new NhanVien();

       const data = await  account.getAllAccount();
        const length = await data.length;
        for(let i = 0 ; i < length ; i++)
        {
          if (data[i].LoaiTaiKhoan === "user")
          {
            const temp = await khachHang.getKhachHangById(data[i].IdTaiKhoan)
            data[i] = await {...data[i], Infor:temp[0]}
          }
          if (data[i].LoaiTaiKhoan !== "user")
          {
            const temp = await nhanVien.getNhanVienById(data[i].IdTaiKhoan)
            data[i] = await {...data[i], Infor:temp[0]}
          }
        }
      //return res.status(200).json(response.recordsets[0]);
        return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllAccountUser: async (req, res) => {
    try {
      const nguoiDung = new NguoiDung();
      const data = await nguoiDung.getAllAccountUser()
      // const account = new Account();
      // const data = await  account.getAllAccount();

      return res.status(200).json(data);
      //  return res.status(200).json({data});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getInforAccount: async (req, res) => {
    try {
      const id = req.params.id;

      if (!req.id) {
        return res.status(401).json("You're not authenticated");
      }

      if (req.id != req.params.id && req.role !== "admin") {
        return res.status(401).json(`You're not authenticated`);
      }
      const nguoiDung = new NguoiDung();

      if (req.role === "user") {
        const response = await nguoiDung.getInforAccountUser(id)
        

        const result = await {
          username: response[0]?.TenDangNhap.trim(),
          name: response[0]?.HoTen,
          phone: response[0]?.SoDienThoai,
          address: response[0]?.DiaChi,
          avatar: response[0]?.Avatar,
        };

        return res.status(200).json({ ...result });
      } else {
        const response = await nguoiDung.getInforAccountStaff(id)
        const result = await {
          username: response[0]?.TenDangNhap.trim(),
          name: response[0]?.HoTen,
          phone: response[0]?.SoDienThoai,
          address: response[0]?.DiaChi,
          avatar: response[0]?.Avatar,
        };

        return res.status(200).json({ ...result });
      }

      //res.status(400).json(response.recordsets[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateInfor: async (req, res) => {
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

export default accountController;
