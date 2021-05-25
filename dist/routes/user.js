"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const router = express_1.Router();
/** Get all Users */
router.get('/', UserController_1.default.getAll);
/** Get one user */
router.get('/:id', UserController_1.default.getById);
/** Create new user */
router.post('/', UserController_1.default.newUser);
/** Update user */
router.patch('/:id', UserController_1.default.updateUser);
/** Delete user */
router.delete('/:id', UserController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map