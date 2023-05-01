import { Module } from '@nestjs/common';

import { CardsController } from '@presentation/controllers';
import { CardsUseCase } from '@application/use-cases';

@Module({
    controllers: [CardsController],
    providers: [CardsUseCase],
})
export class CardsModule {}
