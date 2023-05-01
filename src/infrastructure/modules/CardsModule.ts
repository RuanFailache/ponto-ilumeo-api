import { Module } from '@nestjs/common';

import { CardsController } from '@presentation/controllers';
import { CardsUseCase } from '@application/use-cases';
import { CardsRepository } from '@infrastructure/database/repositories';

@Module({
    controllers: [CardsController],
    providers: [CardsUseCase, CardsRepository],
})
export class CardsModule {}
