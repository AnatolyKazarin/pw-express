import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import authRoute from "./router/auth/auth.route.js";
import * as mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware.js";
import apiRoute from "./router/api/index.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ''

const app = express()

app.use(express.json())
app.use('/auth', authRoute)
app.use('/api', authMiddleware, apiRoute)
app.use(errorMiddleware)

async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT , () => {
            console.log('Server Started')
            // app.use('/docs', swaggerUi.serve, swaggerUi.setup(output))
        })
    } catch (e) {
        console.log(e)
    }
}

DB_URL && await start()
