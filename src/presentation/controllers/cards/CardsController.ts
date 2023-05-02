import { AuthenticationGuard } from '@application/guards/AuthenticationGuard';
import { CardsUseCase } from '@application/use-cases';
import { Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';

@Controller('/api/cards')
export class CardsController {
    constructor(private readonly cardsUseCase: CardsUseCase) {}

    @UseGuards(AuthenticationGuard)
    @Get('/today')
    async getCurrentUserTime(@Request() request) {
        return this.cardsUseCase.calculateTotalTimeForToday(request.user.id);
    }

    @UseGuards(AuthenticationGuard)
    @Get('/previous')
    async findAllFromCurrentUser(@Request() request) {
        return this.cardsUseCase.calculateTotalTimeForEachPreviousDay(
            request.user.id,
        );
    }

    @UseGuards(AuthenticationGuard)
    @Patch('/create')
    async create(@Request() request) {
        await this.cardsUseCase.create(request.user.id);
    }

    @UseGuards(AuthenticationGuard)
    @Patch('/finish')
    async finish(@Request() request) {
        await this.cardsUseCase.finish(request.user.id);
    }
}
