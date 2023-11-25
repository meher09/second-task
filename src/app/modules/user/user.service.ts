import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (userData: User) => {
    const newUser = await UserModel.create(userData);
    return newUser;
};

const findAllUsersInDB = async () => {
    const allUser = await UserModel.find({}).select('username fullName.age email address.street address.city address.country');
    return allUser
}


const findSingleUserInDB = async (userId: number) => {
    const user = await UserModel.findOne({ userId }).select('-password');
    return user;
};







export const UserServices = {
    createUserIntoDB, findAllUsersInDB, findSingleUserInDB
};