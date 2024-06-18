import * as dotenv from 'dotenv'
dotenv.config()
import jwt, {Secret} from "jsonwebtoken";
import ApiError from "../utils/error.js";
import {NextFunction, Request, Response} from "express";

const secret = process.env.SECRET_KEY as Secret

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.toString().split(' ')[1]
        if(!token) {
            return next(ApiError.unauthorized("Unauthorized"))
        }
        const decodedData = jwt.verify(token, secret) as {id: string, email: string}

        req.userId = decodedData.id
        req.email = decodedData.email
        next()
    } catch (e) {
        return next(ApiError.unauthorized("Unauthorized"))
    }

}
