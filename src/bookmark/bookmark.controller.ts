import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    @Get()
    getBookmarks(){}

    @Get()
    getBookmarkById(){}

    @Post()
    createBookmark(){}

    @Patch()
    editBookmarkById(){}

    deleteBookmarkById(){}
}
