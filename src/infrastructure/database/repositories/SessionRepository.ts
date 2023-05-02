import { PrismaService } from '@infrastructure/external';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(userId: string, accessToken: string): Promise<string> {
        const session = await this.prismaService.session.create({
            data: {
                accessToken,
                userId,
            },
        });
        return session.accessToken;
    }

    async validate(accessToken: string): Promise<string | undefined> {
        const sessions = await this.prismaService.session.findMany({
            where: {
                accessToken,
            },
        });
        return sessions.length > 0 ? sessions[0].userId : undefined;
    }
}
