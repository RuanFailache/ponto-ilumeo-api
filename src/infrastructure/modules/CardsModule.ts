import { Module } from '@nestjs/common';

import { CardsController } from '@presentation/controllers';
import { CardsUseCase } from '@application/use-cases';
import { CardsRepository } from '@infrastructure/database/repositories';
import { PrismaModule } from '@infrastructure/external';
import { SessionModule } from './SessionModule';

@Module({
    controllers: [CardsController],
    providers: [CardsUseCase, CardsRepository],
    imports: [PrismaModule, SessionModule],
})
export class CardsModule {}
