import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    balance: { type: Number }
});
export default model('User', UserSchema);
