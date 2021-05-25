"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const router = express_1.Router();
/** login */
router.post('/login', AuthController_1.default.login);
exports.default = router;
//# sourceMappingURL=auth.js.map