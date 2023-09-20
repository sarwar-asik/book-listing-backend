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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const authSignIN = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    console.log(payload, 'payload');
    // const isUserExist = await User.isUserExistsMethod(phoneNumber);
    // // console.log(isUserExist,"isUserExits");
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not match');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // console.log(isPasswordMatch,"ispaaaaaaaaaa");
    if (isUserExist.password && !isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is not correct');
    }
    // // console.log(isUserExist,"isUserExist");
    // const { role, _id, phoneNumber: existphoneNumber } = isUserExist;
    //   jwt part ///
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.expires_in });
    return token;
    // // eslint-disable-next-line no-console
    // console.log(
    //   'accessToken',
    //   accessToken,
    //   'refreshToken',
    //   refreshToken,
    //   'refreshToken'
    // );
    // return {
    //   accessToken,
    //   refreshToken,
    // };
    // return payload
});
const insertDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 ~ file: Auth.services.ts:68 ~ insertDb ~ data:', data);
    data.password = yield bcrypt_1.default.hash(data.password, Number(10));
    // console.log(data);
    const signUp = yield prisma_1.default.user.create({
        data,
    });
    return {
        id: signUp.id,
        name: signUp.name,
        email: signUp === null || signUp === void 0 ? void 0 : signUp.email,
        role: signUp.role,
        contactNo: signUp === null || signUp === void 0 ? void 0 : signUp.contactNo,
        address: signUp === null || signUp === void 0 ? void 0 : signUp.address,
        profileImg: signUp === null || signUp === void 0 ? void 0 : signUp.profileImg,
    };
});
exports.AUthService = { insertDb, authSignIN };
