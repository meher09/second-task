import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUsers);
router.get('/api/users/:userId', UserControllers.getSingleUser);
router.put('/api/users/:userId', UserControllers.updateUser);
router.delete('/api/users/:userId', UserControllers.deleteSingleUser);


export const UserRoutes = router