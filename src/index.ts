import 'dotenv/config'
import express from 'express'
import * as mongoose from "mongoose";

const PORT = process.env.PORT || 5000
console.log(PORT)
const app = express()


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT , () => {console.log('Server Started')})
    } catch (e) {
        console.log(e)
    }
}

await start()
