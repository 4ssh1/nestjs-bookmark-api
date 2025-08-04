import { Injectable } from '@nestjs/common';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){}

    getBookmarks(userId: number){
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        })
    }
    
    getBookmarkById(userId: number, bookmarkId:number){}
    
    async createBookmark(userId: number, dto: CreateBookMarkDto){
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })

        return bookmark
    }
    
    editBookmarkById(userId:number, dto: EditBookMarkDto, bookmarkId:number){}
    
    deleteBookmarkById(userId:number, bookmarkId:number){}
}
