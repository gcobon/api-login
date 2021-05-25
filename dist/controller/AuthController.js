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
const User_1 = require("./../entity/User");
const typeorm_1 = require("typeorm");
class AuthController {
}
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const { username, password } = req.body;
    if (!(username && password)) {
        return res
            .status(400)
            .json({ message: 'Username & Password are required' });
    }
    let user;
    try {
        user = yield userRepository.findOneOrFail({
            where: { username },
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'Username or password incorrect', error });
    }
    if (user.checkPassword(password)) {
        delete user.password;
        res.send(user);
    }
    else {
        res.status(400).json({ status: 'Username or password incorrect' });
    }
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map