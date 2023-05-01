import { CardsUseCase } from '@application/use-cases';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}
    @Get()
    async findAllFromCurrentUser() {
        await this.cardsUseCase.getAllCardsWithUserId();
        return {
            today: {},
            previous: [],
        };
    }

    // @Patch()
    // async startTodayChronometer() {}

    // @Patch()
    // async pauseTodayChronometer() {}
}
