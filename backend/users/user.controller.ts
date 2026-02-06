import userModel, { User } from "./user.model";
import { UserProcess } from "./user.process";

export class UserController {
    constructor(private readonly process: UserProcess) {}

    public async getAll(): Promise<User[]> {
        return this.process.getAll();
    }

    public async getById(id: string): Promise<User> {
        return this.process.getById(id);
    }

    public async add(input: any): Promise<User> {
        const newUser = new userModel(input);
        return this.process.save(newUser);
    }

    public async update(input: any): Promise<User> {
        const userToUpdate = await this.process.getById(input._id);
        userToUpdate.name = input.name;
        return this.process.save(userToUpdate);
    }

    public async delete(id: string): Promise<User> {
        return this.process.delete(id);
    }
}
