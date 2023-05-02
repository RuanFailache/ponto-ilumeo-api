import { SessionUseCase } from '@application/use-cases/session/SessionUseCase';
import { UserUseCase } from '@application/use-cases/user/UserUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from './dtos/AuthenticateDto';

@Controller('/api/auth')
export class AuthenticationController {
    constructor(
        private readonly userUseCase: UserUseCase,
        private readonly sessionUseCase: SessionUseCase,
    ) {}

    @Post()
    async authenticate(@Body() authenticateDto: AuthenticateDto) {
        const userId = await this.userUseCase.validateRegistrationCode(
            authenticateDto.registrationCode,
        );

        const accessToken = await this.sessionUseCase.create(userId);

        return { accessToken };
    }
}
