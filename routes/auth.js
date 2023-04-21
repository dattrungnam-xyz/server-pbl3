import authController from "../controllers/authController.js";
import middlewareController from "../controllers/middlewareController.js";

import express from 'express';



const router = express.Router();



router.post("/changepassword/:idNguoiDung", middlewareController.verifyToken,authController.changePassword);
router.post("/register", authController.registerUser);
router.post("/register/staff", middlewareController.verifyTokenOnlyAdmin,authController.registerStaff);

router.post("/login", authController.loginUser);


export default router;