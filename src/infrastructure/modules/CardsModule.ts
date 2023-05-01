import { Module } from '@nestjs/common';

import { CardsController } from '@presentation/controllers';
import { CardsUseCase } from '@application/use-cases';
import { CardsRepository } from '@infrastructure/database/repositories';
import { PrismaModule } from '@infrastructure/external';

@Module({
    controllers: [CardsController],
    providers: [CardsUseCase, CardsRepository],
    imports: [PrismaModule],
})
export class CardsModule {}
