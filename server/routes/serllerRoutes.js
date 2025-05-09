import express from 'express'
import { isSellerAuth,  loginSeller,  logoutSeller } from '../controllers/SellerControllers.js';
import authSeller from '../middlewares/authSeller.js';
import { register } from '../controllers/UserControllers.js';

const sellerRouter = express.Router();

sellerRouter.post('/register', register)
sellerRouter.post('/login', loginSeller)
sellerRouter.get('/is-auth', authSeller, isSellerAuth)
sellerRouter.post('/logout', logoutSeller)

export default sellerRouter