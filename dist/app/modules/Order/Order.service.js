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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId: data.userId,
            orderedBooks: {
                create: data === null || data === void 0 ? void 0 : data.orderedBooks.map((book) => ({
                    bookId: book.bookId,
                    quantity: book.quantity,
                })),
            }
        },
        include: {
            orderedBooks: true
        }
    });
    return result;
});
const getAllDB = (userRole) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userRole.userId);
    const isUserExits = yield prisma_1.default.user.findUnique({
        where: {
            id: userRole === null || userRole === void 0 ? void 0 : userRole.userId
        }
    });
    // console.log(isUserExits);
    if (!isUserExits) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User is not exits");
    }
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: userRole === null || userRole === void 0 ? void 0 : userRole.userId
        },
        include: {
            orderedBooks: true
        }
    });
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: true
        }
    });
    return result;
});
const updateItoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = yield prisma_1.default.order.update({
        where: {
            id
        },
        data: payload,
        include: {
            orderedBooks: true
        }
    });
    return result;
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id
        },
        include: {
            orderedBooks: true
        }
    });
    return result;
});
exports.OrderService = { insertDB, getAllDB, getSingleData, updateItoDb, deleteFromDb };
