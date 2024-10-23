import userModel, { User } from "./user.model";
import UserProcess from "./user.process";

export class UserController {

    public async getAll(): Promise<User[]> {
        return UserProcess.getAll();
    }

    public async getById(id: string): Promise<User> {
        return UserProcess.getById(id);
    }

    public async add(input: any): Promise<User> {
        const newUser = new userModel(input);
        return UserProcess.save(newUser);
    }

    public async update(input: any): Promise<User> {
        const userToUpdate = await UserProcess.getById(input._id);
        userToUpdate.name = input.name;
        return UserProcess.save(userToUpdate);
    }

    public async delete(id: string): Promise<User> {
        return UserProcess.delete(id);
    }
}

export default new UserController();
