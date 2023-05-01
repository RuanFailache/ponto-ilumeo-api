import { CardsRepository } from '@infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardsUseCase {
    constructor(private readonly cardsRepository: CardsRepository) {}

    async getAllCardsWithUserId(): Promise<Card[]> {
        await this.cardsRepository.findAll();
        return [];
    }
}
