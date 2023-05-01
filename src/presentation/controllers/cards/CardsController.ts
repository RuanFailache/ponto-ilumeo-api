import { CardsUseCase } from '@application/use-cases';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}

    @Get()
    async findAllFromCurrentUser() {
        return this.cardsUseCase.getAllPreviousCardsWithUserId();
    }

    // @Patch()
    // async startTodayChronometer() {}

    // @Patch()
    // async pauseTodayChronometer() {}
}
