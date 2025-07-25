import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@getUser() user: User){
        return user;
    }

    @Patch()
    editUser() {
        return
    }
}
