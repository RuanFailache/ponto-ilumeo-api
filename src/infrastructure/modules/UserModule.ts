import { UserUseCase } from '@application/use-cases/user/UserUseCase';
import { UserRepository } from '@infrastructure/database/repositories';
import { PrismaModule } from '@infrastructure/external';
import { Module } from '@nestjs/common';

@Module({
    exports: [UserUseCase],
    providers: [UserUseCase, UserRepository],
    imports: [PrismaModule],
})
export class UserModule {}
