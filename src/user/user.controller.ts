import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    public constructor(private readonly _userService: UserService) {}

    @Post()
    public async addUser(@Body() user: User): Promise<number> {
        const addedUserId = await this._userService.addUser(user);

        return addedUserId;
    }

    @Get(':userId')
    public async getUser(@Param('userId') userId: string): Promise<User> {
        const user = await this._userService.getUser(parseInt(userId));

        return user;
    }

    @Get()
    public async getUsers(
        @Query('skip') skip: string,
        @Query('limit') limit: string,
    ): Promise<User[]> {
        const users = await this._userService.getUsers(
            parseInt(skip),
            parseInt(limit),
        );

        return users;
    }
}
