import importController from "../controllers/importProductController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/",middlewareController.verifyTokenOnlyAdmin ,importController.getAllDonNhapHang);
router.get("/:id",middlewareController.verifyTokenOnlyAdmin ,importController.getDonNhapChiTietById);


router.post("/",middlewareController.verifyTokenOnlyAdmin ,importController.addDonNhapChiTiet);
router.post("/:id",middlewareController.verifyTokenOnlyAdmin ,importController.updateDonNhapChiTiet);




export default router;