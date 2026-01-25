import { Schema, Document, model } from 'mongoose';

export interface User extends Document<string> {
    name: string;
}

export const userSchema = new Schema({
    name: {
        type: String
    }
});
const userModel = model<User>('User', userSchema);
export default userModel;
