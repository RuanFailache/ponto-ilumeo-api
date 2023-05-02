import { CardEntity, TimeEntity } from '@application/entities/cards';
import { CardsRepository } from '@infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';
import { HOUR, MINUTE } from '@utils/constants/time';

@Injectable()
export class CardsUseCase {
    constructor(private readonly cardsRepository: CardsRepository) {}

    private calculateTimeDifference(
        createdAt: Date,
        finishedAt: Date,
    ): TimeEntity {
        const createdTimeInMs = createdAt.getTime();
        const finishedTimeInMs = finishedAt.getTime();
        const differenceInMs = Math.abs(createdTimeInMs - finishedTimeInMs);
        const hours = Math.floor(differenceInMs / HOUR);
        const minutes = Math.floor((differenceInMs / MINUTE) % 60);
        return { hours, minutes };
    }

    async calculateTotalTimeForToday(userId: string): Promise<CardEntity> {
        const cards = await this.cardsRepository.findAllFromCurrentUser(userId);

        const currentDate = new Date(Date.now());
        const formattedCurrentDate = currentDate.toLocaleDateString();

        const todayCards = cards.filter((card) => {
            const formattedDate = card.createdAt.toLocaleDateString();
            return formattedCurrentDate === formattedDate;
        });

        const todayCard: CardEntity = {
            isFinished: todayCards.every((card) => card.finishedAt !== null),
            date: currentDate,
            totalTime: {
                hours: 0,
                minutes: 0,
            },
        };

        console.log({ todayCards, todayCard });

        for (const card of todayCards) {
            const time = this.calculateTimeDifference(
                card.createdAt,
                card.finishedAt ?? currentDate,
            );

            let totalOfHours = time.hours + todayCard.totalTime.hours;
            let totalOfMinutes = time.minutes + todayCard.totalTime.minutes;

            if (totalOfMinutes >= 60) {
                totalOfHours += 1;
                totalOfMinutes -= 60;
            }

            todayCard.totalTime = {
                hours: totalOfHours,
                minutes: totalOfMinutes,
            };
        }

        return todayCard;
    }

    async calculateTotalTimeForEachPreviousDay(
        userId: string,
    ): Promise<CardEntity[]> {
        const cards = await this.cardsRepository.findAllFromCurrentUser(userId);

        const hashTable: Record<string, CardEntity> = {};

        const currentDate = new Date(Date.now());
        const formattedCurrentDate = currentDate.toLocaleDateString();

        for (const card of cards) {
            const formattedDate = card.createdAt.toLocaleDateString();

            if (formattedCurrentDate === formattedDate) continue;

            const cardTotalTime = this.calculateTimeDifference(
                card.createdAt,
                card.finishedAt ?? currentDate,
            );

            if (hashTable[formattedDate] === undefined) {
                hashTable[formattedDate] = {
                    isFinished: Boolean(card.finishedAt),
                    date: card.createdAt,
                    totalTime: cardTotalTime,
                };
                continue;
            }

            const currDateTime = hashTable[formattedDate].totalTime;

            let totalOfHours = cardTotalTime.hours + currDateTime.hours;
            let totalOfMinutes = cardTotalTime.minutes + currDateTime.minutes;

            if (totalOfMinutes >= 60) {
                totalOfHours += 1;
                totalOfMinutes -= 60;
            }

            hashTable[formattedDate].totalTime = {
                hours: totalOfHours,
                minutes: totalOfMinutes,
            };
        }

        return Object.values(hashTable);
    }

    async create(userId: string) {
        await this.cardsRepository.create(userId);
    }

    async finish(userId: string) {
        await this.cardsRepository.finish(userId);
    }
}
