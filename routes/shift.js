import shiftController from "../controllers/shiftController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/", middlewareController.verifyTokenOnlyAdmin,shiftController.getAllShift);
router.post("/", middlewareController.verifyTokenOnlyAdmin,shiftController.updateShift);

//router.post("/login", staffController.loginUser);


export default router;