import { Schema, model } from 'mongoose';
const Transaction = new Schema({
    senderId: String,
    recipientId: String,
    date: Date,
    amount: Number,
    balance: Number,
    senderName: String,
    recipientName: String,
});
export default model('Transaction', Transaction);
