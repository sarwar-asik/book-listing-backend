"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const Category_controller_1 = require("./Category.controller");
const Category_validation_1 = require("./Category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Category_validation_1.CategoryValidation.createCategory), Category_controller_1.CategoryController.insertDB);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Category_controller_1.CategoryController.getAllDB);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Category_controller_1.CategoryController.getSingleDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(Category_validation_1.CategoryValidation.updateCategory), Category_controller_1.CategoryController.updateIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Category_controller_1.CategoryController.deleteFromDb);
exports.categoryRoutes = router;
