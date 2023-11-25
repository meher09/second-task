import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (userData: User) => {
    const newUser = await UserModel.create(userData);
    return newUser;
};














export const UserServices = {
    createUserIntoDB,
};