import bookingController from "../controllers/bookingController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/time", bookingController.getAllTime);
router.post("/",middlewareController.verifyToken, bookingController.bookingService);


//router.post("/login", bookingController.loginUser);


export default router;