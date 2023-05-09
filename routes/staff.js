import staffController from "../controllers/staffController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/barbernotbusy/:IdGioCat&:Thu&:Ca&:Day", staffController.getAllStaffNotBusy);

router.post("/checkbusy", staffController.checkBusy);

router.get("/barber", staffController.getStaffBarBer);

router.post("/",middlewareController.verifyTokenOnlyAdmin, staffController.updateInforStaff);

router.delete("/:id",middlewareController.verifyTokenOnlyAdmin, staffController.removeStaff);

router.get("/",middlewareController.verifyTokenOnlyAdmin, staffController.getAllStaff);
//router.post("/login", staffController.loginUser);


export default router;