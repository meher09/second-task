"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const fullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
});
const orderSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: [String],
    address: { type: addressSchema, required: true },
    orders: [orderSchema]
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
