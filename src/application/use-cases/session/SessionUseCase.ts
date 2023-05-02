import { SessionRepository } from '@infrastructure/database/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class SessionUseCase {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly jwtService: JwtService,
    ) {}

    async create(userId: string) {
        const accessToken = randomUUID();

        await this.sessionRepository.create(userId, accessToken);

        return accessToken;
    }

    async validate(accessToken: string) {
        const userId = await this.sessionRepository.validate(accessToken);
        if (userId === undefined) throw new UnauthorizedException();
        return { id: userId };
    }
}
