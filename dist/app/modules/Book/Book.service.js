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
            category: true,
        },
    });
    return result;
});
const getAllDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filters, 'ffffffff');
    console.log(options, 'oooo');
    // const {page=1,size=5,sortOrder="asc",} = options
    const page = Number(options.page || 1);
    const limit = Number(options.size || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    // console.log(page,limit,skip,'sss');
    // const { category, ...search } = filters;
    // console.log("category",category,"search",search);
    // const searchArray =[]
    // for (const key in search) {
    //   if (Object.prototype.hasOwnProperty.call(search, key)) {
    //     const condition = {
    //       [key as keyof typeof search]: {
    //         contains: search[key ] as string,
    //         mode: 'insensitive',
    //       },
    //     };
    //     searchArray.push(condition);
    //   }
    // }
    // console.log(...searchArray,'ssssssss');
    const where = Object.assign(Object.assign(Object.assign(Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.minPrice) && { price: { gte: parseInt(filters === null || filters === void 0 ? void 0 : filters.minPrice, 10) } })), ((filters === null || filters === void 0 ? void 0 : filters.maxPrice) && { price: { lte: parseInt(filters === null || filters === void 0 ? void 0 : filters.maxPrice, 10) } })), ((filters === null || filters === void 0 ? void 0 : filters.category) && { categoryId: filters === null || filters === void 0 ? void 0 : filters.category })), ((filters === null || filters === void 0 ? void 0 : filters.search) && {
        OR: [
            { title: { contains: filters === null || filters === void 0 ? void 0 : filters.search, mode: 'insensitive' } },
            { author: { contains: filters === null || filters === void 0 ? void 0 : filters.search, mode: 'insensitive' } },
            { genre: { contains: filters === null || filters === void 0 ? void 0 : filters.search, mode: 'insensitive' } },
        ],
    }));
    const result = yield prisma_1.default.book.findMany({
        where,
        // where:
        //  {
        // ! for filter
        // categoryId: {
        //   [category ? 'equals' : 'contains']: category,
        //   mode: 'insensitive',
        // },
        //! for search
        //  [searchArray?.length>0?"OR":"title"]: searchArray
        // OR: searchArray.length > 0
        // ? [...searchArray]
        // : [
        //     {
        //       [category?"title":"categoryId"]: {
        //         contains: '',
        //         mode: 'insensitive',
        //       },
        //     },
        //   ],
        // ...(filters?.category && { categoryId: "eebfd026-cdf8-4558-8da4-44167250a71d" }),
        // OR: [
        //   {
        //     categoryId: {
        //       equals: filters?.category || "",
        //       mode: 'insensitive',
        //     },
        //   },
        //   {
        //     title: {
        //       contains: filters?.title || '', 
        //       mode: 'insensitive',
        //     },
        //   },
        //   {
        //     author: {
        //       contains: filters?.author || '',
        //       mode: 'insensitive',
        //     },
        //   },
        //   {
        //     genre: {
        //       contains: filters?.genre || '', 
        //       mode: 'insensitive',
        //     },
        //   },
        // ],
        // },
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
    getSingleByCategoryData
};
