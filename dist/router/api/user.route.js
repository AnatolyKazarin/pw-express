import { Router } from 'express';
import authMiddleware from "../../middlewares/auth.middleware.js";
import UsersController from "../../controllers/user.controller.js";
const userRoute = Router();
userRoute.get('/', authMiddleware, UsersController.getUser);
userRoute.post('/', authMiddleware, UsersController.getUsers);
export default userRoute;
