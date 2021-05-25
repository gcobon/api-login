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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const index_1 = require("./routes/index");
const PORT = process.env.PORT || 3000;
typeorm_1.createConnection()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = express();
    // middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    // register express routes from defined application routes
    app.use(index_1.default);
    app.get('/', (req, res) => {
        res.json({ message: 'welcome to my api' });
    });
    // setup express app here
    // ...
    // start express server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map