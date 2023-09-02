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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    function covertDateFormate(inputDate) {
        const dateObject = new Date(inputDate);
        if (isNaN(dateObject.getTime())) {
            return null;
        }
        const isoDate = dateObject.toISOString();
        return isoDate;
    }
    // const date1 = "1951-07-16";
    // const date2 = "2023-09-02T06:46:40.626Z";
    const isoDate1 = covertDateFormate(data === null || data === void 0 ? void 0 : data.publicationDate);
    data.publicationDate = isoDate1;
    // console.log(data,'fffff');
    // return data
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true
        }
    });
    return result;
});
const getAllDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filters, "ffffffff");
    console.log(options, "oooo");
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true
        }
    });
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true
        }
    });
    return result;
});
const updateItoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: true
        }
    });
    return result;
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id
        }
    });
    return result;
});
exports.BookService = { insertDB, getAllDB, getSingleData, updateItoDb, deleteFromDb };
