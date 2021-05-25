import { Router } from 'express';
import UserController from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

/** Get all Users */
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.getAll);

/** Get one user */
router.get('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.getById);

/** Create new user */
router.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);

/** Update user */
router.patch(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.updateUser
);

/** Delete user */
router.delete(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);

export default router;
