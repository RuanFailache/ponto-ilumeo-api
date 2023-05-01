import { Controller, Get } from '@nestjs/common';

@Controller()
export class CardsController {
    @Get()
    async findAllFromCurrentUser() {
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
