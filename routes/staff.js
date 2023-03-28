import staffController from "../controllers/staffController.js";

import express from 'express';



const router = express.Router();



router.get("/barbernotbusy/:IdGioCat&:Thu&:Ca&:Day", staffController.getAllStaffNotBusy);
router.get("/barber", staffController.getStaffBarBer);
router.get("/", staffController.getAllStaff);

//router.post("/login", staffController.loginUser);


export default router;