import {Router} from 'express'
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import TransactionsController from "../controllers/transactions.controller";

const transactionsRoute = Router()

transactionsRoute.get('/transactions', authMiddleware, TransactionsController.getAll )
transactionsRoute.post('/transactions', authMiddleware, TransactionsController.create)

transactionsRoute.post('/login', AuthController.login)

export default transactionsRoute
