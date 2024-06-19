import { Router } from "express";
import transactionsRoute from "./transactions.route.js";
import userRoute from "./user.route.js";
const apiRoute = Router();
apiRoute.use('/transactions', transactionsRoute);
apiRoute.use('/users', userRoute);
export default apiRoute;
