import {Schema, model, ObjectId} from 'mongoose'

export type TransactionModel = {
    _id: ObjectId
    senderId: string
    recipientId: string
    date: string
    amount: number
    balance: number
    senderName: string
    recipientName: string
}

const Transaction = new Schema<TransactionModel>({
    senderId: String,
    recipientId: String,
    date: Date,
    amount: Number,
    balance: Number,
    senderName: String,
    recipientName: String,
})

export default model('Transaction', Transaction)
