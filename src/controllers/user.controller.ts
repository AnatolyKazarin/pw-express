import User, {UserModel} from '../models/user.model.js'
import ApiError from "../utils/error.js";
import {NextFunction, Request, Response} from "express";

class UsersController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req
            const user: UserModel | null = await User.findById(userId)
            if(!user) {
                return next(ApiError.badRequest("User not found"))
            }
            return res.json({user})
        } catch (e) {
            return next(ApiError.badRequest("Unexpected error"))
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {filter} = req.body
            const users: UserModel[] | null = await User.find({username: { "$regex": filter, "$options": "i" }})
            if(!users.length) {
                return next(ApiError.badRequest(`Users with name ${filter} not found`))
            }
            return res.json(users)
        } catch (e) {
            return next(ApiError.badRequest('Unexpected error'))
        }
    }
}

export default new UsersController()
