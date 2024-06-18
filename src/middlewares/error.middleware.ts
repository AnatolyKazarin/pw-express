import ApiError from "../utils/error.js";
import {Request, Response} from "express";

export default function(err: unknown, req: Request, res: Response) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка!'})
}
