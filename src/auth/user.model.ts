import mongoose, {Document, Schema}  from 'mongoose'

export interface IUser extends Document{
    email: string;
    password: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'student'},
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User