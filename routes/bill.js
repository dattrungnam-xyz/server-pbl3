import billController from "../controllers/billController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/", middlewareController.verifyTokenOnlyAdmin,billController.getAllBill);
router.get("/profit", middlewareController.verifyTokenOnlyAdmin,billController.getProfit);
router.post("/", middlewareController.verifyTokenOnlyAdmin,billController.addBill);






export default router;