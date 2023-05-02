import { PrismaService } from '@infrastructure/external';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async validate(registrationCode: string): Promise<User | undefined> {
        const user = await this.prismaService.user.findUnique({
            where: {
                registrationCode,
            },
        });
        return user;
    }

    async findById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
}
