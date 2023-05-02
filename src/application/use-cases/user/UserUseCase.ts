import { UserRepository } from '@infrastructure/database/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async validateRegistrationCode(registrationCode: string) {
        const user = await this.userRepository.validate(registrationCode);
        if (!user) throw new UnauthorizedException();
        return user.id;
    }
}
