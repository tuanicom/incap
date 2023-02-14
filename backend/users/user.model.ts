import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
}

export const userSchema = new Schema({
    name: {
        type: String
    }
});
const user = model<IUser>('User', userSchema);
export default user;
