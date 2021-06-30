import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    public constructor(private readonly _userRepository: UserRepository) {}

    public async addUser(user: User): Promise<number> {
        const addedUser = await this._userRepository.save(user);

        return addedUser.id;
    }

    public async getUser(userId: number): Promise<User> {
        const user = await this._userRepository.findOne(userId);

        return user;
    }

    public async getUsers(skip: number, limit: number): Promise<User[]> {
        const users = await this._userRepository.find({
            skip,
            take: limit,
        });

        return users;
    }
}
