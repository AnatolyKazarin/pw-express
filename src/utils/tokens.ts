import * as dotenv from 'dotenv'
dotenv.config()
import {Secret} from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import {ObjectId} from "mongoose";

const secret = process.env.SECRET_KEY as Secret

export const generateAccessToken = (id: string | ObjectId, email: string) => {
    const payload = {id, email}
    return sign(payload, secret, {expiresIn: '24h'})
}
