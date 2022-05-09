import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Groups } from 'src/group/Groups';
import { UserService } from './user.service';
import { Users } from './Users';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll(): Promise<Users[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param() params): Promise<Users> {
        return await this.userService.getById(params.id);
    }

    @Get('uid/:uid')
    async getByUid(@Param() params): Promise<Users> {
        return await this.userService.getByUid(params.uid);
    }

    @Post()
    async create(@Body() user: Users) {
        return await this.userService.create(user);
    }

    @Delete('force/:id')
    async delete(@Param() params) {
        await this.userService.delete(params.id)
    }

    @Get(':id/groups')
    async getGroups(@Param() params): Promise<Groups[]> {
        return await this.userService.getGroups(params.id);
    }
}
