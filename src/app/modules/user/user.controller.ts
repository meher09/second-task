import { Request, Response } from 'express';
import { UserServices } from './user.service';



const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body.user;
        const newUser = await UserServices.createUserIntoDB(userData);
        const { password, ...userDataWithoutPassword } = newUser.toObject();

        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: userDataWithoutPassword,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: err.message,
        });
    }
};


const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all user data from the database. 
        const users = await UserServices.findAllUsersInDB()

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: err.message,
        });
    }
};


// Single User 

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await UserServices.findSingleUserInDB(userId);

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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: err.message,
        });
    }
};




export const UserControllers = {
    createUser, getAllUsers, getSingleUser
};