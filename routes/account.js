import accountController from "../controllers/accountController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/",middlewareController.verifyTokenOnlyAdmin ,accountController.getAllAccount);
router.get("/infor/:id",middlewareController.verifyToken ,accountController.getInforAccount);
router.put("/infor/:id",middlewareController.verifyToken ,accountController.updateInfor);

//router.post("/login", accountController.loginUser);


export default router;