import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import authRoute from "./router/auth.route";
import * as mongoose from "mongoose";
import transactionsRoute from "./router/transactions.route";

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ''

const app = express()

app.use(express.json())
app.use('/auth', authRoute)
app.use('/api', transactionsRoute)

async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT , () => {console.log('Server Started')})
    } catch (e) {
        console.log(e)
    }
}

DB_URL && await start()
