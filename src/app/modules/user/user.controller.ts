import { Request, Response } from 'express';
import { UserServices } from './user.service';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body.user;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Replace plain password with hashed password
        userData.password = hashedPassword;
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
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: err.message,
        });
    }
};



// update user 

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const updatedUserData = req.body.user;
        const existingUser = await UserServices.findSingleUserInDB(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }

        const updatedUser = await UserServices.updateUserInDB(userId, updatedUserData);

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: 'Failed to update user data',
            });
        }

        // Return the updated user object directly without the password field
        const { password, ...userDataWithoutPassword } = updatedUser.toObject();

        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: userDataWithoutPassword,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: err.message,
        });
    }
};




const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const existingUser = await UserServices.findSingleUserInDB(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }

        // Delete the user
        await UserServices.deleteUserInDB(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            "success": false,
            "message": "Error deleting user",
            "error": {
                "code": 500,
                "description": "Error deleting user"
            }
        });
    }
};




export const UserControllers = {
    createUser, getAllUsers, getSingleUser, updateUser, deleteSingleUser
};