import sql from "mssql/msnodesqlv8.js";
import pool from "../connectDB.js";

const { MAX } = sql;

const accountController = {
  getInfor: async (req, res) => {
    try {
      const id = req.params.id;

      if (!req.id) {
        return res.status(401).json("You're not authenticated");
      }

      if (req.id != req.params.id && req.role !== "admin") {
        return res.status(401).json(`You're not authenticated`);
      }

      const response = await pool
        .request()
        .query(
          `SELECT * from TaiKhoan,KhachHang where IdTaiKhoan = '${id}' and KhachHang.IdUser = TaiKhoan.IdTaiKhoan`
        );

      const result = await {
        username: response?.recordsets[0][0]?.TenDangNhap.trim(),
        name: response?.recordsets[0][0]?.HoTen,
        phone: response?.recordsets[0][0]?.SoDienThoai,
        address: response?.recordsets[0][0]?.DiaChi,
        avatar: response?.recordsets[0][0]?.Avatar,
      };

      return res.status(200).json({ ...result });

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
