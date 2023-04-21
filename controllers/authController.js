import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import jwt from "jsonwebtoken";
import { NguoiDung } from "../models/NguoiDung.js";
import { NhanVien } from "../models/NhanVien.js";
/////aaaa
const { MAX } = sql;

const authController = {
  generateAccessToken: (id, role) => {
    return jwt.sign(
      {
        id: id,
        role: role,
      },
      process.env.JWT_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const response = await pool
        .request()
        .query(
          `SELECT * from NguoiDung where TenDangNhap = '${username.trim()}' `
        );

      const result = await {
        id: response?.recordsets[0][0]?.IdTaiKhoan,
        username: response?.recordsets[0][0]?.TenDangNhap.trim(),
        password: response?.recordsets[0][0]?.MatKhau,
        type: response?.recordsets[0][0]?.LoaiTaiKhoan,
        avatar: response?.recordsets[0][0]?.Avatar,
      };

      if (!result.id) {
        return res.status(404).json({ error: "Tên đăng nhập không tồn tại" });
      }
      //  var query;
      // result.type === "user" ? query = `SELECT * from KhachHang where IdKhachHang = '${result.id}' ` : `SELECT * from NhanVien where IdNhanVien = '${result.id}' `

      // response = await pool
      // .request()
      // .query(query);

      //   result = await {
      //     ...result,

      //   };

      if (result.password === password) {
        const token = authController.generateAccessToken(
          result.id,
          result.type
        );
        if (result.type === "user") {
          const response = await pool
            .request()
            .query(
              `SELECT * from KhachHang where IdKhachHang = '${result.id}' `
            );
          const result2 = await {
            ...result,
            name: response?.recordsets[0][0]?.HoTen,
            phone: response?.recordsets[0][0]?.SoDienThoai,
            address: response?.recordsets[0][0]?.DiaChi,
          };

          return res.status(200).json({ ...result2, token: token, error: "" });
        } else {
          const response = await pool
            .request()
            .query(`SELECT * from NhanVien where IdNhanVien = '${result.id}' `);
          const result2 = await {
            ...result,
            name: response?.recordsets[0][0]?.HoTen,
            phone: response?.recordsets[0][0]?.SoDienThoai,
            address: response?.recordsets[0][0]?.DiaChi,
          };

          return res.status(200).json({ ...result2, token: token, error: "" });
        }
      } else {
        return res.status(404).json({ error: "Mật khẩu không chính xác" });
      }
      //res.status(400).json(response.recordsets[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { username, password, type, name, phone } = req.body;

      const addUserAccount = async function (
        username,
        password,
        type,
        name,
        phone
      ) {
        try {
          const insertUser = await pool
            .request()
            .input("TenDangNhap", sql.NVarChar(MAX), username)
            .input("MatKhau", sql.NVarChar(MAX), password)
            .input("LoaiTaiKhoan", sql.NVarChar(MAX), type)
            .input("HoTen", sql.NVarChar(MAX), name)
            .input("SoDienThoai", sql.NVarChar(11), phone)
            .execute("InsertInforUser");
          return insertUser.recordsets;
        } catch (err) {
          console.log(err);
        }
      };

      const checkUserName = async function (username) {
        const response = await pool
          .request()
          .query(
            `SELECT * from NguoiDung where TenDangNhap = '${username.trim()}'`
          );

        const result = {
          id: response?.recordsets[0][0]?.IdTaiKhoan,
          username: response?.recordsets[0][0]?.TenDangNhap.trim(),
          password: response?.recordsets[0][0]?.MatKhau,
          type: response?.recordsets[0][0]?.LoaiTaiKhoan,
        };

        if (!result.id) {
          return true;
        }
        if (result.username === username) {
          return false;
        } else {
          return true;
        }
      };

      if (await checkUserName(username)) {
        addUserAccount(username, password, type, name, phone).then((data) => {
          return res.status(201).json({ error: "" });
        });
      } else {
        return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerStaff: async (req, res) => {
    try {
      const {
        TenDangNhap,
        MatKhau,
        LoaiTaiKhoan,
        HoTen,
        SoDienThoai,
        DiaChi,
        NamKinhNghiem,
        LoaiNhanVien,
      } = req.body;
      const nguoiDung = new NguoiDung();
      const nhanVien = new NhanVien();

      const checkUserName = function (response) {
        const result = {
          IdTaiKhoan: response[0]?.IdTaiKhoan,
          TenDangNhap: response[0]?.TenDangNhap.trim(),
          MatKhau: response[0]?.MatKhau,
          LoaiTaiKhoan: response[0]?.LoaiTaiKhoan,
        };

        if (!result.IdTaiKhoan) {
          return true;
        }
        if (result.TenDangNhap === TenDangNhap) {
          return false;
        } else {
          return true;
        }
      };

      const response = await nguoiDung.checkExistUsername(TenDangNhap);

      if (await checkUserName(response)) {
        const data = await nguoiDung.addUser(
          TenDangNhap,
          MatKhau,
          LoaiTaiKhoan
        );

        await nhanVien.addNhanVien(
          data[0].IdNhanVien,
          HoTen,
          SoDienThoai,
          DiaChi,
          NamKinhNghiem,
          LoaiNhanVien
        );

        return res
          .status(201)
          .json({ message: "Thêm nhân viên thành công", error: "" });
      } else {
        return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const { idNguoiDung } = req.params;
      const id = req.id

 

      if (+idNguoiDung !== +id) {
        return res.status(400).json({ error: "Truy cập không hợp lệ" });
      }

      const nguoiDung = new NguoiDung();
      const data = await nguoiDung.getAccountById(id);

      if ((await data[0].MatKhau) !== oldPassword.toString()) {
        return res.status(400).json({ error: "Mật khẩu cũ không chính xác" });
      } else {
        nguoiDung.updatePassword(id, newPassword);
      }

      return res
        .status(201)
        .json({ message: "Thay đổi mật khẩu thành công", error: "" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default authController;
