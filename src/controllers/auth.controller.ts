import User, {UserModel} from '../models/user.model'
import bcrypt from 'bcryptjs'
import ApiError from "../utils/error";
import {generateAccessToken} from "../utils/tokens";
import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest('You must send username and password'))
            }

            const {username, email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return next(ApiError.badRequest('A user with that email already exists'))
            }
            const hashedPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, password: hashedPassword, email, balance: 500})
            await user.save()
            const token = generateAccessToken(user._id, email)
            return res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest("Registration error"))
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const candidate: UserModel | null = await User.findOne({email})
            if(!candidate) {
                return next(ApiError.badRequest(`User with ${email} not found`))
            }
            const validPassword = bcrypt.compareSync(password, candidate.password)
            if(!validPassword) {
                return next(ApiError.badRequest('Invalid email or password'))
            }
            const token = generateAccessToken(candidate._id, candidate.email)
            return res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Ошибка авторизации'))
        }
    }
}

export default new AuthController()
