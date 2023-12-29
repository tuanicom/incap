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

    public async save(newCategory: IUser): Promise<IUser> {
        return newCategory.save();
    }

    public async delete(id: string): Promise<IUser> {
        return user.findOneAndDelete({ _id: id }).exec().then(res => res);
    }
}

export default new UserProcess() as IUserProcess;
