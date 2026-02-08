import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface User extends Document<string> {
    name: string;
}

export const userSchema = new Schema({
    name: {
        type: String
    }
});
function getUserModel(): Model<User> {
    if ((mongoose as any).models && (mongoose as any).models.User) {
        return (mongoose as any).models.User as Model<User>;
    }
    if (mongoose.modelNames && mongoose.modelNames().includes && mongoose.modelNames().includes('User')) {
    }
    try {
        return model<User>('User', userSchema);
    } catch (err: any) {
        if (err && err.name === 'OverwriteModelError') {
            return (mongoose as any).models.User as Model<User>;
        }
        throw err;
    }
}

function userModelFactory(this: any, ...args: any[]) {
    const M = getUserModel();

    return new (M as any)(...args);
}

const staticMethods = ['find', 'findById', 'findOneAndDelete', 'findOne', 'create', 'findByIdAndUpdate', 'findOneAndUpdate', 'deleteOne'];
for (const name of staticMethods) {
    (userModelFactory as any)[name] = (...args: any[]) => {
        const M = getUserModel();
        return (M as any)[name](...args);
    };
}

export default (userModelFactory as unknown) as Model<User>;
