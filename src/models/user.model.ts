import {Schema, model, ObjectId} from 'mongoose'

type UserModel = {
    _id: ObjectId
    email: string
    username: string
    password: string
    balance: number
}

const User = new Schema<UserModel>({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    balance: {type: Number, value: 500}
})

export default model('User', User)
