import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardsUseCase {
    async getAllCardsWithUserId(): Promise<Card[]> {
        return [];
    }
}
