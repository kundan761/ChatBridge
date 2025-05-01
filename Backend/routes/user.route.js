import express from 'express';
import { getAllUsers, getUserProfile, loginUser, registerUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/profile',auth, getUserProfile);
userRoute.get('/getAllUsers', auth, getAllUsers); // Assuming you have a function to get all users

export default userRoute;