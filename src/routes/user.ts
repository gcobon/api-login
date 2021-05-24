import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

/** Get all Users */
router.get('/', UserController.getAll);

/** Get one user */
router.get('/:id', UserController.getById);

/** Create new user */
router.post('/', UserController.newUser);

/** Update user */
router.patch('/:id', UserController.updateUser);

/** Delete user */
router.delete('/:id', UserController.deleteUser);

export default router;