import express from 'express';
import { addProduct, getAll } from '../controllers/productController.js';


const router = express.Router();

router.post('/addProduct', addProduct);

router.get("/",getAll)

export default router;