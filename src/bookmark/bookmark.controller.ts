import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { getUser } from 'src/auth/decorator';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}
    @Get()
    getBookmarks(@getUser('id') userId:number){
        return this.bookmarkService.getBookmarks(userId)
    }

    @Get(':id')
    getBookmarkById(
        @getUser('id') userId:number,
        @Param('id', ParseIntPipe)  bookmarkId: number
    ){
        return this.bookmarkService.getBookmarkById(userId, bookmarkId)
    }

    @Post()
    createBookmark(
        @getUser('id') userId:number,
        @Body() dto:CreateBookMarkDto
    ){
        return this.bookmarkService.createBookmark(userId, dto)
    }

    @Patch(':id')
    editBookmarkById(
        @getUser('id') userId:number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookMarkDto
    ){
        return this.bookmarkService.editBookmarkById(userId, dto, bookmarkId)
    }

    @Delete(':id')
    deleteBookmarkById(
        @getUser('id') userId:number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ){
        this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
    }
}
