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

        const userCard: CardEntity = {
            date: currentDate,
            totalTime: {
                hours: 0,
                minutes: 0,
            },
        };

        for (const card of cards) {
            const formattedDate = card.createdAt.toLocaleDateString();

            if (formattedCurrentDate !== formattedDate) continue;

            const time = this.calculateTimeDifference(
                card.createdAt,
                card.finishedAt ?? currentDate,
            );

            let totalOfHours = time.hours + userCard.totalTime.hours;
            let totalOfMinutes = time.minutes + userCard.totalTime.minutes;

            if (totalOfMinutes >= 60) {
                totalOfHours += 1;
                totalOfMinutes -= 60;
            }

            userCard.totalTime = {
                hours: totalOfHours,
                minutes: totalOfMinutes,
            };
        }

        return userCard;
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

            hashTable[formattedDate] = {
                date: card.createdAt,
                totalTime: {
                    hours: totalOfHours,
                    minutes: totalOfMinutes,
                },
            };
        }

        return Object.values(hashTable);
    }
}
