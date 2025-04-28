import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import { addUserToGroup, createGroup } from '../controllers/groupController.js';


const groupRouter = express.Router();

// Create a group
groupRouter.post('/create', auth, createGroup);

// Add a user to group
groupRouter.put('/:groupId/add', auth, addUserToGroup);

export default groupRouter;
