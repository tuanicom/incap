import user, { IUser } from "./user.model";

export interface IUserProcess {
    getAll(): Promise<IUser[]>;
    getById(id: string): Promise<IUser>;
    save(newCategory: IUser): Promise<IUser>;
    delete(id: string): Promise<IUser>;
}

export class UserProcess implements IUserProcess {

    public async getAll(): Promise<IUser[]> {
        return user.find().exec();
    }

    public async getById(id: string): Promise<IUser> {
        return user.findById(id).exec();
    }

    public async save(newUser: IUser): Promise<IUser> {
        return newUser.save();
    }

    public async delete(id: string): Promise<IUser> {
        return user.findOneAndDelete({ _id: id }).exec();
    }
}

export default new UserProcess() as IUserProcess;
