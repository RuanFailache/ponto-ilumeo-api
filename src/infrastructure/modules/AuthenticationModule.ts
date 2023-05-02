import { Module } from '@nestjs/common';

import { AuthenticationController } from '@presentation/controllers/authentication/AuthenticationController';
import { SessionModule } from './SessionModule';
import { UserModule } from './UserModule';

@Module({
    controllers: [AuthenticationController],
    imports: [SessionModule, UserModule],
})
export class AuthenticationModule {}
