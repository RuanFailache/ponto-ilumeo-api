import { CardsUseCase } from '@application/use-cases';
import { Controller, Get } from '@nestjs/common';

@Controller('/api/cards')
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}

    async getCurrentUserTime() {
        return this.cardsUseCase.getTodayTotalTimeFromCurrentUser('');
    }

    @Get()
    async findAllFromCurrentUser() {
        return this.cardsUseCase.getAllPreviousCardsWithUserId('');
    }

    // @Patch()
    // async startTodayChronometer() {}

    // @Patch()
    // async pauseTodayChronometer() {}
}
