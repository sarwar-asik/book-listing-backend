"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Book_controller_1 = require("./Book.controller");
const Book_validation_1 = require("./Book.validation");
const router = (0, express_1.Router)();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Book_validation_1.BookValidation.createBook), Book_controller_1.BookController.insertDB);
// router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.getSingleDataById);
router.get('/:categoryId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.getSingleByCategoryDataById);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.getAllDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Book_validation_1.BookValidation.updateBook), Book_controller_1.BookController.updateIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.deleteFromDb);
exports.bookRoutes = router;
