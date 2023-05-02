import { AuthenticationGuard } from '@application/guards/AuthenticationGuard';
import { UserUseCase } from '@application/use-cases/user/UserUseCase';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userUseCase: UserUseCase) {}

    @UseGuards(AuthenticationGuard)
    @Get()
    async getCurrentUser(@Request() request) {
        const user = await this.userUseCase.getCurrentUser(request.user.id);
        delete user.id;
        return user;
    }
}
