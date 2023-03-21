
import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";
import jwt from "jsonwebtoken";

/////aaaa
const { MAX } = sql;

const authController = {

  generateAccessToken: (id,role) => {
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
          `SELECT * from TaiKhoan,KhachHang where TenDangNhap = '${username.trim()}' and KhachHang.IdUser = TaiKhoan.IdTaiKhoan`
        );
          

        const result = await {
        id: response?.recordsets[0][0]?.IdTaiKhoan,
        username: response?.recordsets[0][0]?.TenDangNhap.trim(),
        password: response?.recordsets[0][0]?.MatKhau,
        type: response?.recordsets[0][0]?.LoaiTaiKhoan,
        name: response?.recordsets[0][0]?.HoTen,
        phone: response?.recordsets[0][0]?.SoDienThoai,
        address: response?.recordsets[0][0]?.DiaChi,
        avatar: response?.recordsets[0][0]?.Avatar,

      };
      
      
      if (!result.id) {
        return res.status(404).json({ error: "Tên đăng nhập không tồn tại" });
      }
      if (result.password === password) {
        const token = authController.generateAccessToken(result.id, result.type)
        return res
          .status(200)
          .json({ ...result, token: token, error: "" });
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
      const {username,password,type,name,phone} = req.body

      const addUserAccount = async function (username,password,type,name,phone) {
        try {
      
          const insertUser = await pool
            .request()
            .input("TenDangNhap", sql.NVarChar(MAX), username)
            .input("MatKhau", sql.NVarChar(MAX), password)
            .input("LoaiTaiKhoan", sql.NVarChar(MAX), type)
            .input("HoTen", sql.NVarChar(MAX), name)
            .input("SoDienThoai",sql.NVarChar(MAX), phone)
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
            `SELECT * from TaiKhoan where TenDangNhap = '${username.trim()}'`
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
        addUserAccount(username,password,type,name,phone).then((data) => {
          return res.status(201).json({ error: "" });
        });
      } else {
        return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


export default authController;
