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





export const UserControllers = {
    createUser,
};