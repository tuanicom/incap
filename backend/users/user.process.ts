import userModel, { User } from "./user.model";

export class UserProcess {

    public async getAll(): Promise<User[]> {
        return userModel.find().exec();
    }

    public async getById(id: string): Promise<User> {
        return userModel.findById(id).exec().then(res => res as User);
    }

    public async save(newCategory: User): Promise<User> {
        return newCategory.save();
    }

    public async delete(id: string): Promise<User> {
        return userModel.findOneAndDelete({ _id: id }).exec().then(res => res as User);
    }
}

export default new UserProcess();
