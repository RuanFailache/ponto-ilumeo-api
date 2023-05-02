import { SessionUseCase } from '@application/use-cases/session/SessionUseCase';
import { SessionRepository } from '@infrastructure/database/repositories';
import { PrismaModule } from '@infrastructure/external';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    exports: [SessionUseCase],
    providers: [SessionUseCase, SessionRepository],
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
})
export class SessionModule {}
