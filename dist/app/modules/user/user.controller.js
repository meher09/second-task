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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body.user;
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
        // Replace plain password with hashed password
        userData.password = hashedPassword;
        const newUser = yield user_service_1.UserServices.createUserIntoDB(userData);
        const _a = newUser.toObject(), { password } = _a, userDataWithoutPassword = __rest(_a, ["password"]);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: userDataWithoutPassword,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: err.message,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all user data from the database. 
        const users = yield user_service_1.UserServices.findAllUsersInDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: err.message,
        });
    }
});
// Single User 
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const user = yield user_service_1.UserServices.findSingleUserInDB(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: err.message,
        });
    }
});
// update user 
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const updatedUserData = req.body.user;
        const existingUser = yield user_service_1.UserServices.findSingleUserInDB(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }
        const updatedUser = yield user_service_1.UserServices.updateUserInDB(userId, updatedUserData);
        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: 'Failed to update user data',
            });
        }
        // Return the updated user object directly without the password field
        const _b = updatedUser.toObject(), { password } = _b, userDataWithoutPassword = __rest(_b, ["password"]);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: userDataWithoutPassword,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: err.message,
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const existingUser = yield user_service_1.UserServices.findSingleUserInDB(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }
        // Delete the user
        yield user_service_1.UserServices.deleteUserInDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            "success": false,
            "message": "Error deleting user",
            "error": {
                "code": 500,
                "description": "Error deleting user"
            }
        });
    }
});
exports.UserControllers = {
    createUser, getAllUsers, getSingleUser, updateUser, deleteSingleUser
};
