import {Router} from 'express'
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import TransactionsController from "../controllers/transactions.controller.js";

const transactionsRoute = Router()

transactionsRoute.get('/transactions', authMiddleware, TransactionsController.getAll )
transactionsRoute.post('/transactions', authMiddleware, TransactionsController.create)

transactionsRoute.post('/login', AuthController.login)

export default transactionsRoute
