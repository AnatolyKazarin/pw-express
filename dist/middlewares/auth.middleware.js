import * as dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import ApiError from "../utils/error.js";
const secret = process.env.SECRET_KEY;
export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization?.toString().split(' ')[1];
        if (!token) {
            return next(ApiError.unauthorized("Unauthorized"));
        }
        const decodedData = jwt.verify(token, secret);
        req.userId = decodedData.id;
        req.email = decodedData.email;
        next();
    }
    catch (e) {
        return next(ApiError.unauthorized("Unauthorized"));
    }
}
