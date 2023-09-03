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
    // ! for received "1951-07-16"  and "2023-09-02T06:46:40.626Z"   type date time
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
            category: true,
        },
    });
    return result;
});
// ! here included pagination , filtering ,searching by my own
const getAllDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filters, 'ffffffff');
    console.log(options, 'oooo');
    // const {page=1,size=5,sortOrder="asc",} = options
    // ! for pagination ///
    const page = Number(options.page || 1);
    const limit = Number(options.size || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'asc';
    const where = {};
    // ! for filter data from Book Table
    if ((filters === null || filters === void 0 ? void 0 : filters.title) ||
        (filters === null || filters === void 0 ? void 0 : filters.author) ||
        (filters === null || filters === void 0 ? void 0 : filters.genre) ||
        (filters === null || filters === void 0 ? void 0 : filters.category) ||
        (filters === null || filters === void 0 ? void 0 : filters.search)) {
        where.OR = [];
        if (filters === null || filters === void 0 ? void 0 : filters.title) {
            where.OR.push({
                title: {
                    contains: filters.title,
                    mode: 'insensitive',
                },
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.author) {
            where.OR.push({
                author: {
                    contains: filters.author,
                    mode: 'insensitive',
                },
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.genre) {
            where.OR.push({
                genre: {
                    contains: filters.genre,
                    mode: 'insensitive',
                },
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.category) {
            where.OR.push({
                AND: [
                    {
                        categoryId: {
                            equals: filters.category,
                            mode: 'insensitive',
                        },
                    },
                ],
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.search) {
            where.OR.push({
                title: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            }, {
                author: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            }, {
                genre: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            });
        }
    }
    // ! for filtering with minPrice and maxPrice ////
    if (filters.minPrice || filters.maxPrice) {
        if (filters.minPrice && filters.maxPrice) {
            where.AND = [
                {
                    price: {
                        gte: parseFloat(filters.minPrice),
                        lte: parseFloat(filters.maxPrice),
                    },
                },
            ];
        }
        else if (filters.minPrice) {
            where.AND = [
                {
                    price: {
                        gte: parseFloat(filters.minPrice),
                    },
                },
            ];
        }
        else if (filters.maxPrice) {
            where.AND = [
                {
                    price: {
                        lte: parseFloat(filters.maxPrice),
                    },
                },
            ];
        }
    }
    const result = yield prisma_1.default.book.findMany({
        where,
        include: {
            category: true,
        },
        // !for pagination
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.book.count();
    // const resultDataNUmber =  result?.length
    return {
        meta: {
            total,
            page,
            size: limit,
        },
        data: result,
    };
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,"id from sing");
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
// ! this function for get single categoryId or id in Book table
const getSingleByCategoryData = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const resultById = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    if (resultById) {
        return resultById;
    }
    const page = Number(options.page || 1);
    const limit = Number(options.size || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    // console.log(id,"id from sing");
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            total,
            page,
            size: limit,
        },
        data: result,
    };
});
const updateItoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, payload);
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    insertDB,
    getAllDB,
    getSingleData,
    updateItoDb,
    deleteFromDb,
    getSingleByCategoryData,
};
