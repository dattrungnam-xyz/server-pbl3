import userController from "../controllers/userController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/", middlewareController.verifyTokenOnlyAdmin,userController.getAllInforUser);

//router.post("/login", staffController.loginUser);


export default router;