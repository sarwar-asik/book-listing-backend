"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_routes_1 = require("../modules/Auth/Auth.routes");
const Users_route_1 = require("../modules/Users/Users.route");
const Category_route_1 = require("../modules/Category/Category.route");
const Book_route_1 = require("../modules/Book/Book.route");
const Order_route_1 = require("../modules/Order/Order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/auth",
        routes: Auth_routes_1.authRouter
    },
    {
        path: "/users",
        routes: Users_route_1.usersRoutes
    },
    {
        path: "/categories",
        routes: Category_route_1.categoryRoutes
    },
    {
        path: "/books",
        routes: Book_route_1.bookRoutes
    },
    {
        path: "/orders",
        routes: Order_route_1.orderRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
