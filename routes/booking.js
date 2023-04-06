import bookingController from "../controllers/bookingController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/time", bookingController.getAllTime);

router.get("/", middlewareController.verifyTokenOnlyAdmin,bookingController.getAllInforBooking);

router.get("/staff/:id", bookingController.getLichDatByIdNhanVien);
router.get("/user/:id", bookingController.getLichDatByIdKhachHang);

router.post("/",middlewareController.verifyToken, bookingController.bookingService);

router.post("/remove",middlewareController.verifyToken, bookingController.RemoveLichDat);


router.post("/rating",middlewareController.verifyToken, bookingController.ratingService);


//router.post("/login", bookingController.loginUser);


export default router;