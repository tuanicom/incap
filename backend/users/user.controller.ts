import user, { IUser } from "./user.model";
import UserProcess from "./user.process";

export interface IUserController {
    getAll(): Promise<IUser[]>;
    getById(id: string): Promise<IUser>;
    add(input: any): Promise<IUser>;
    update(input: any): Promise<IUser>;
    delete(id: string): Promise<IUser>;
}

export class UserController implements IUserController {

    public async getAll(): Promise<IUser[]> {
        return UserProcess.getAll();
    }

    public async getById(id: string): Promise<IUser> {
        return UserProcess.getById(id);
    }

    public async add(input: any): Promise<IUser> {
        const newUser = new user(input);
        return UserProcess.save(newUser);
    }

    public async update(input: any): Promise<IUser> {
        const userToUpdate = await UserProcess.getById(input._id);
        userToUpdate.name = input.title;
        return UserProcess.save(userToUpdate);
    }

    public async delete(id: string): Promise<IUser> {
        return UserProcess.delete(id);
    }
}

export default new UserController() as IUserController;
