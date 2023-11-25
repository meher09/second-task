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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.UserModel.create(userData);
    return newUser;
});
const findAllUsersInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_model_1.UserModel.find({}).select('username fullName.age email address.street address.city address.country');
    return allUser;
});
const findSingleUserInDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId }).select('-password');
    return user;
});
const updateUserInDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const update = Object.assign(Object.assign({}, updatedUserData), { password: undefined });
    const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ userId }, update, { new: true }).select('-password');
    return updatedUser;
});
const deleteUserInDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId }, { isDeleted: true });
    return result;
});
exports.UserServices = {
    createUserIntoDB, findAllUsersInDB, findSingleUserInDB, updateUserInDB, deleteUserInDB
};
