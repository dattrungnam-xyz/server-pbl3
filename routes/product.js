import productController from "../controllers/productController.js";
import middlewareController from "../controllers/middlewareController.js";
import express from 'express';



const router = express.Router();



router.get("/",middlewareController.verifyTokenOnlyAdmin ,productController.getAllProduct);
router.get("/:id",middlewareController.verifyTokenOnlyAdmin ,productController.getProductByIdProduct);

router.post("/",middlewareController.verifyTokenOnlyAdmin ,productController.addProduct);
router.post("/:id",middlewareController.verifyTokenOnlyAdmin ,productController.updateProduct);
router.delete("/:id",middlewareController.verifyTokenOnlyAdmin ,productController.removeProduct);



export default router;