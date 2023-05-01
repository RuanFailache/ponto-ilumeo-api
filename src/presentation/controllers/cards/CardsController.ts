import { CardsUseCase } from '@application/use-cases';
import { Controller, Get } from '@nestjs/common';

@Controller('/api/cards')
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}

    async getCurrentUserTime() {
        return this.cardsUseCase.calculateTotalTimeForToday('');
    }

    @Get()
    async findAllFromCurrentUser() {
        return this.cardsUseCase.calculateTotalTimeForEachPreviousDay('');
    }

    // @Patch()
    // async startTodayChronometer() {}

    // @Patch()
    // async pauseTodayChronometer() {}
}
