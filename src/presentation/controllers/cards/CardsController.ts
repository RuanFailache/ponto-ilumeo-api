import { CardsUseCase } from '@application/use-cases';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}

    @Get()
    async findAllFromCurrentUser() {
        const cards = await this.cardsUseCase.getAllCardsWithUserId();
        const lastIndex = cards.length - 1;

        return {
            today: cards[lastIndex],
            previous: cards.slice(0, lastIndex),
        };
    }

    // @Patch()
    // async startTodayChronometer() {}

    // @Patch()
    // async pauseTodayChronometer() {}
}
