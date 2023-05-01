import { PrismaService } from '@infrastructure/external';
import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllFromCurrentUser(userId: string): Promise<Card[]> {
        return this.prismaService.card.findMany({
            where: {
                userId,
            },
        });
    }
}
