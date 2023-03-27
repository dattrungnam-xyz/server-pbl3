import bookingController from "../controllers/bookingController.js";

import express from 'express';



const router = express.Router();



router.get("/time", bookingController.getAllTime);


//router.post("/login", bookingController.loginUser);


export default router;