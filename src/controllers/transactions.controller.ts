import User, {UserModel} from '../models/user.model.js'
import ApiError from "../utils/error.js";
import {NextFunction, Request, Response} from "express";
import Transaction, {TransactionModel} from "../models/transaction.model.js";

class TransactionsController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req
            const transactionsData: TransactionModel[] = await Transaction.find({senderId: userId})
            const transactions = transactionsData.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            return res.json({transactions})
        } catch (e) {
            return next(ApiError.badRequest("Registration error"))
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {recipientId, amount} = req.body
            const {userId} = req
            const sender: UserModel | null = await User.findById(userId)
            const recipient: UserModel | null = await User.findById(recipientId)
            if(!recipient || !sender) {
                return next(ApiError.badRequest(`User not found`))
            }
            if(sender.balance < amount) {
                return next(ApiError.badRequest(`Balance exceeded`))
            }
            await User.updateOne({_id: sender._id}, {balance: sender.balance - amount})
            await User.updateOne({_id: recipient._id}, {balance: recipient.balance + amount})

            const transaction = new Transaction({    senderId: sender._id,
                recipientId: recipient._id,
                date: Date.now(),
                amount,
                balance: sender.balance - amount,
                senderName: sender.username,
                recipientName: recipient.username})

            await transaction.save()

            return res.json(transaction)
        } catch (e) {
            return next(ApiError.badRequest('Ошибка авторизации'))
        }
    }
}

export default new TransactionsController()
