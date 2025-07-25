import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources: {
                db:{
                    url: process.env.DATABASE_URL
                }
            }
        })

        console.log('DATABASE_URL is:', process.env.DATABASE_URL)
    }
    cleanDb(){
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ])
    }

}
