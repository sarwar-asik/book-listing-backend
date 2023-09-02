"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.createUser), Auth_controller_1.AuthController.signUpDB);
exports.authRouter = router;
