import { CardEntity, TimeEntity } from '@application/entities/cards';
import { CardsRepository } from '@infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';
import { HOUR, MINUTE } from '@utils/constants/time';

@Injectable()
export class CardsUseCase {
    constructor(private readonly cardsRepository: CardsRepository) {}

    private formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    private calculateTotalTime(createdAt: Date, finishedAt: Date): TimeEntity {
        const createdTimeInMs = createdAt.getTime();
        const finishedTimeInMs = finishedAt.getTime();
        const differenceInMs = Math.abs(finishedTimeInMs - createdTimeInMs);
        return {
            hours: Math.floor(differenceInMs / HOUR),
            minutes: Math.floor((differenceInMs / MINUTE) % 60),
        };
    }

    async getAllPreviousCardsWithUserId(): Promise<CardEntity[]> {
        const cards = await this.cardsRepository.findAll();

        const hashTable: Record<string, CardEntity> = {};

        const currentDate = new Date(Date.now());
        const formattedCurrentDate = this.formatDate(currentDate);

        for (const card of cards) {
            const formattedDate = this.formatDate(card.createdAt);

            if (formattedCurrentDate == formattedDate) continue;

            const cardTotalTime = this.calculateTotalTime(
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
