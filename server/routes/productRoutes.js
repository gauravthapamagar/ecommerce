import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, productById, productList } from '../controllers/ProductController.js';
const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller, addProduct)
productRouter.get('/list', productList)
productRouter.post('/id', productById)
productRouter.post('/stock', authSeller, changeStock)

export default productRouter
