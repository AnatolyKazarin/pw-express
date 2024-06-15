import {Schema, model, ObjectId} from 'mongoose'

export type UserModel = {
    _id: ObjectId
    email: string
    username: string
    password: string
    balance: number
}

const UserSchema = new Schema<UserModel>({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    balance: {type: Number}
})

export default model('User', UserSchema)
