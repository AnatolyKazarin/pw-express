import * as dotenv from 'dotenv';
dotenv.config();
import pkg from 'jsonwebtoken';
const { sign } = pkg;
const secret = process.env.SECRET_KEY;
export const generateAccessToken = (id, email) => {
    const payload = { id, email };
    return sign(payload, secret, { expiresIn: '24h' });
};
