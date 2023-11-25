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


const updateUserInDB = async (userId: number, updatedUserData: any) => {
    const update = { ...updatedUserData, password: undefined, };
    const updatedUser = await UserModel.findOneAndUpdate({ userId }, update, { new: true }).select('-password');
    return updatedUser;
};



const deleteUserInDB = async (userId: number) => {
    const result = await UserModel.updateOne({ userId }, { isDeleted: true });
    return result;
};





export const UserServices = {
    createUserIntoDB, findAllUsersInDB, findSingleUserInDB, updateUserInDB, deleteUserInDB
};