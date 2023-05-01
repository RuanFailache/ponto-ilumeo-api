import { CardEntity } from '@application/entities/cards';
import { faker } from '@faker-js/faker';
import { DAY, HOUR, MINUTE } from '@utils/constants/time';

export class CardsFactory {
    static generateFakeCard() {
        return {
            id: faker.datatype.uuid(),
            userId: faker.datatype.uuid(),
            createdAt: faker.date.recent(),
            finishedAt: faker.date.recent(),
        };
    }

    static generateCardWithCustomDates(params: {
        currentDate: Date;
        createdAtDays: number;
        finishedAtHours: number;
        finishedAtMinutes: number;
    }) {
        const currentTime = params.currentDate.getTime();
        const creationTime = currentTime - params.createdAtDays * DAY;

        return {
            id: faker.datatype.uuid(),
            userId: faker.datatype.uuid(),
            createdAt: new Date(creationTime),
            finishedAt: new Date(
                creationTime +
                    params.finishedAtHours * HOUR +
                    params.finishedAtMinutes * MINUTE,
            ),
        };
    }

    static generateFakeCardEntity(): CardEntity {
        return {
            date: faker.date.recent(),
            totalTime: {
                hours: faker.datatype.number(24),
                minutes: faker.datatype.number(60),
            },
        };
    }
}
