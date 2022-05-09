import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Files } from './Files';
import { opendir } from 'fs/promises';

@Injectable()
export class FileService {


    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {
    }

    async getAll(): Promise<Files[]> {
        try {
            const files = await this.em.find(Files, {});
            return files;
        } catch (e) {
            return e;
        }
    }

    async upload(file: Storage.MultipartFile): Promise<void> {
        const fs = require('fs');
        fs.writeFile('uploads/' + file.filename, await file.toBuffer(), function (err) {
            if (err) return console.log(err);
            console.log('uploaded file: ' + file.filename)
        })
    }

    async devClearFiles(): Promise<void> {
        try {
            //await this.em.nativeDelete(Files, {});
            //this.em.flush();
            const fs = require('fs');
            const dir = await opendir('./uploads');
            for await (const dirent of dir)
                fs.unlink('./uploads/' + dirent.name, () => { })
        } catch (e) {
            return e;
        }
    }
    // async upload(ctx: ExecutionContext): Promise<any> {
    //     const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    //     const isMultipart = req.isMultipart();
    //     if (!isMultipart)
    //         throw new BadRequestException("multipart/form-data expected.");
    //     const file = await req.file();
    //     if (!file) throw new BadRequestException("file expected");
    //     console.log(file.file.bytesRead)
    // }
}