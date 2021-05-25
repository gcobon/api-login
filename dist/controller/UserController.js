"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
class UserController {
}
UserController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const users = yield userRepository.find({
        select: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
    });
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.status(404).json({ message: 'No result' });
    }
});
UserController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const { id } = req.params;
    try {
        const user = yield userRepository.findOneOrFail(id);
        delete user.password;
        res.send(user);
    }
    catch (error) {
        res.status(404).json({ message: 'Not found' });
    }
});
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const { username, password, role } = req.body;
    const user = new User_1.User();
    user.username = username;
    user.password = password;
    user.role = role;
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        user.hashPassword();
        yield userRepository.save(user);
        delete user.password;
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        res.status(409).json({ message: 'Username already exist', error });
    }
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const { id } = req.params;
    const { username, role } = req.body;
    let user;
    /** Try get user */
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.username = username;
    user.role = role;
    const errors = yield class_validator_1.validate(user);
    if (errors.length) {
        return res.status(400).json(errors);
    }
    try {
        yield userRepository.save(user);
    }
    catch (error) {
        res.status(409).json({ message: 'Username already in use' });
    }
    delete user.password;
    res.status(200).json({ message: 'User updated', user });
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const { id } = req.params;
    let user;
    /** Try get user */
    try {
        user = yield userRepository.findOneOrFail(id);
        yield userRepository.remove(user);
    }
    catch (error) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
});
exports.default = UserController;
//# sourceMappingURL=UserController.js.map