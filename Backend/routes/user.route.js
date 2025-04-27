import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/profile',auth, getUserProfile);

export default userRoute;