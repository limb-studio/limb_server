import { Controller, Delete, ExecutionContext, Get, Post, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { Files } from './Files';
import fastify = require('fastify');
import { File } from './file.decorator';
import { UploadGuard } from './upload.guard';

@Controller('file')
export class FileController {

    constructor(private readonly fileService: FileService) { }

    @Get()
    async getAll(): Promise<Files[]> {
        return await this.fileService.getAll();
    }

    @Post('upload')
    @UseGuards(UploadGuard)
    async upload(@File() file: Storage.MultipartFile) {
        return await this.fileService.upload(file)
    }

    @Delete('devClearFiles')
    async devClearFiles(): Promise<void> {
        return await this.fileService.devClearFiles();
    }
}
