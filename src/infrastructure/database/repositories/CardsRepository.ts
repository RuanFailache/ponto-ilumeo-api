import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardsRepository {
    async findAll(): Promise<Card[]> {
        return [];
    }
}
