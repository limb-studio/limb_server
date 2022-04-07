import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from 'src/user/Users';
import { GroupService } from './group.service';
import { Groups } from './Groups';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Get()
    async getAll(): Promise<Groups[]> {
        return await this.groupService.getAll();
    }

    @Get(':id')
    async getById(@Param() params): Promise<Groups> {
        return await this.groupService.getById(params.id);
    }

    @Get('uid/:uid')
    async getByUid(@Param() params): Promise<Groups> {
        return await this.groupService.getByUid(params.uid);
    }

    @Post()
    async create(@Body() user: Groups) {
        return await this.groupService.create(user);
    }

    @Put(':id/appendUser/:uid')
    async appendUser(@Param() params) {
        await this.groupService.appendUser(params.id, params.uid)
    }

    @Get(':id/getUsers')
    async getUsers(@Param() params): Promise<Users[]> {
        return await this.groupService.getUsers(params.id);
    }

    @Delete('force/:id')
    async delete(@Param() params) {
        await this.groupService.delete(params.id)
    }
}