import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js';
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/profile', getUserProfile);

export default userRoute;