"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find();
            res.status(200).json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email: req.params.email }).populate("posts", "title");
            res.status(302).json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, username } = req.body;
            const newUser = new User_1.default({ name, email, password, username });
            yield newUser.save();
            res.status(201).json({ data: newUser });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const updatedUser = yield User_1.default.findOneAndUpdate({ email }, req.body, {
                new: true
            });
            res.status(202).json(updatedUser);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            yield User_1.default.findOneAndDelete({ email });
            res.status(202).json({ Response: "Deleted" });
        });
    }
    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/:email", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:email", this.updateUser);
        this.router.delete("/:email", this.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
