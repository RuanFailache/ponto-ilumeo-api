import { Module } from '@nestjs/common';

import { UserUseCase } from '@application/use-cases';

import { UserRepository } from '@infrastructure/database/repositories';
import { PrismaModule } from '@infrastructure/external';

import { UserController } from '@presentation/controllers';

import { SessionModule } from './SessionModule';

@Module({
    exports: [UserUseCase],
    controllers: [UserController],
    providers: [UserUseCase, UserRepository],
    imports: [PrismaModule, SessionModule],
})
export class UserModule {}
