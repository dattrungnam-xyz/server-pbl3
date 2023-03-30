import serviceController from "../controllers/serviceController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/",serviceController.getService);
router.get("/:id",serviceController.getServiceById);
router.post("/",middlewareController.verifyTokenOnlyAdmin ,serviceController.addService);
router.post("/:id",middlewareController.verifyTokenOnlyAdmin ,serviceController.updateService);




export default router;