import express from 'express'
import { isAuth, login, logout, register } from '../controllers/UserControllers.js'
import authUser from '../middlewares/authUser.js';

const userRoutes = express.Router();

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/is-auth', authUser, isAuth)
userRoutes.post('/logout', logout)



export default userRoutes