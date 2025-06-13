import User, { IUser } from "../models/user.model";

type CreateUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export class UserRepository {
    async save(userData: CreateUserInput): Promise<IUser> {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async findById(id: string): Promise<IUser | null> {
        console.log('find by id', id);
        return User.findOne({ _id: id });
    }
}

export const userRepository = new UserRepository();
