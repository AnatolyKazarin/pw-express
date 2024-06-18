import { Router } from 'express';
import AuthController from "../controllers/auth.controller.js";
import { check } from "express-validator";
const authRoute = Router();
authRoute.post('/signup', [
    check('username', "Username cannot be empty").notEmpty(),
    check('email', "Wrong email address").isEmail(),
    check('password', "Password should be more than 8 and less than 12 symbols").isLength({ min: 4, max: 12 })
], AuthController.registration);
authRoute.post('/login', AuthController.login);
export default authRoute;
