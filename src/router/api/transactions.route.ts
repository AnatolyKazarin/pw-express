import {Router} from 'express'
import authMiddleware from "../../middlewares/auth.middleware.js";
import TransactionsController from "../../controllers/transactions.controller.js";

const transactionsRoute = Router()

transactionsRoute.get('/', authMiddleware, TransactionsController.getAll)
transactionsRoute.post('/', authMiddleware, TransactionsController.create)

export default transactionsRoute
