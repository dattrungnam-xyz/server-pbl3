import pool from "../connectDB.js";

export class LichDat {
  async getIdLichDat(IdNhanVien, IdKhachHang, NgayDat, NgayCat, IdGioCat) {
    const response = await pool
      .request()

      .query(
        `SELECT * from LichDat where IdNhanVien = ${IdNhanVien} and IdGioCat = ${IdGioCat} and IdKhachHang = ${IdKhachHang} and NgayCat = '${NgayCat}' and NgayDat = '${NgayDat}'`
      );
    return response.recordsets[0];
  }
  async getLichDatByIdNhanVien(IdNhanVien) {
    const response = await pool
      .request()

      .query(
        `select LD.IdLich, LD.IdKhachHang, LD.IdNhanVien, LD.NgayDat, LD.NgayCat, LD.IdGioCat,LD.TongThoiGian,
        GC.GioCat,
        KH.HoTen,KH.DiaChi,KH.SoDienThoai,
        ND.Avatar
        
        from LichDat as LD, NguoiDung as ND, KhachHang as KH,GioCat as GC
        where LD.IdNhanVien = ${IdNhanVien}
        and LD.IdKhachHang = ND.IdTaiKhoan
        and ND.IdTaiKhoan = KH.IdKhachHang
        and LD.IdGioCat = GC.IdGioCat
        
        order by LD.NgayCat desc`
      );

    return response.recordsets[0];
  }
  async getLichDatByIdKhachHang(IdKhachHang) {
    const response = await pool.request().query(
      `select LD.IdLich, LD.IdKhachHang, LD.IdNhanVien, LD.NgayDat, LD.NgayCat, LD.IdGioCat,LD.TongThoiGian,LD.DaDanhGia,
        GC.GioCat,
        NV.HoTen,NV.DiaChi,NV.SoDienThoai,NV.NamKinhNghiem,
        ND.Avatar
        
        from LichDat as LD, NguoiDung as ND, NhanVien as NV,GioCat as GC
        where LD.IdKhachHang = ${IdKhachHang}
        and LD.IdNhanVien = ND.IdTaiKhoan
        and ND.IdTaiKhoan = NV.IdNhanVien
        and LD.IdGioCat = GC.IdGioCat
        
        order by LD.NgayCat desc`
    );
    return response.recordsets[0];
  }
  async removeLichDatByIdLich(IdLich) {
    const response = await pool.request().query(`
      DELETE FROM LichDat WHERE IdLich = ${IdLich};
      `);
    return response.recordsets[0];
  }
  async setStatusRating(IdLich) {
    const response = await pool.request().query(`
          UPDATE LichDat
          SET DaDanhGia = 1
          WHERE IdLich = ${IdLich};
          `);
    return response.recordsets[0];
  }

  async getAllInforLichDat() {
    const response = await pool.request().query(`
    select LD.IdLich, LD.IdKhachHang, LD.IdNhanVien, LD.NgayDat, LD.NgayCat, LD.IdGioCat,LD.TongThoiGian,LD.DaDanhGia, LD.DaThanhToan,
    GC.GioCat,
    NV.HoTen as HoTenNV,NV.DiaChi,NV.SoDienThoai,NV.NamKinhNghiem,
    ND1.Avatar as AvatarKH,
    ND2.Avatar as AvatarNV,
    KH.HoTen as HoTenKH
    from LichDat as LD, NguoiDung as ND1,NguoiDung as ND2, NhanVien as NV,GioCat as GC, KhachHang as KH
    where
    LD.IdNhanVien = ND2.IdTaiKhoan
      and LD.IdKhachHang = ND1.IdTaiKhoan
      and ND2.IdTaiKhoan = NV.IdNhanVien
      and LD.IdGioCat = GC.IdGioCat
      and KH.IdKhachHang = ND1.IdTaiKhoan
    order by LD.NgayCat desc
          `);
    return response.recordsets[0];
  }
  async getInforLichDatByIdLich(id) {
    const response = await pool
      .request()
      .query(`SELECT * from LichDat where IdLich = ${id}`);
    return response.recordsets[0];
  }
  async getInforDetailLichDatByIdLich(id) {
    const response = await pool
      .request()
      .query(`select LD.IdLich, LD.IdKhachHang, LD.IdNhanVien, LD.NgayDat, LD.NgayCat, LD.IdGioCat,LD.TongThoiGian,LD.DaDanhGia, LD.DaThanhToan,
      GC.GioCat,
      NV.HoTen as HoTenNV,NV.DiaChi,NV.SoDienThoai,NV.NamKinhNghiem,
      ND1.Avatar as AvatarKH,
      ND2.Avatar as AvatarNV,
      KH.HoTen as HoTenKH
      from LichDat as LD, NguoiDung as ND1,NguoiDung as ND2, NhanVien as NV,GioCat as GC, KhachHang as KH
      where
      LD.IdLich = ${id} and
      LD.IdNhanVien = ND2.IdTaiKhoan
        and LD.IdKhachHang = ND1.IdTaiKhoan
        and ND2.IdTaiKhoan = NV.IdNhanVien
        and LD.IdGioCat = GC.IdGioCat
        and KH.IdKhachHang = ND1.IdTaiKhoan
      order by LD.NgayCat desc`);
    return response.recordsets[0];
  }
  async updateThanhToan(id) {
    const response = await pool
      .request()

      .query(
        `
      UPDATE LichDat
      SET DaThanhToan = 1
      WHERE IdLich = ${id};
      
      `
      );
    return response.recordsets[0];
  }
}
