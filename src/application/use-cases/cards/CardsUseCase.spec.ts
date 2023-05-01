import { Test } from '@nestjs/testing';
import { CardsUseCase } from './CardsUseCase';
import { CardsModule } from '@infrastructure/modules/CardsModule';
import { CardsRepository } from '@infrastructure/database/repositories';
import { CardsFactory } from '@test/factories/CardsFactory';
import { faker } from '@faker-js/faker';

describe('CardsUseCase', () => {
    let sut: CardsUseCase;

    let cardsRepository: CardsRepository;

    const currentDate = faker.date.past();
    const userId = faker.datatype.uuid();

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CardsModule],
        }).compile();

        sut = moduleRef.get<CardsUseCase>(CardsUseCase);
        cardsRepository = moduleRef.get<CardsRepository>(CardsRepository);

        jest.spyOn(Date, 'now').mockReturnValue(currentDate.getTime());
    });

    describe('calculateTotalTimeForToday', () => {
        it('Should ensure method calls CardsRepository.findAllFromCurrentUser', async () => {
            const mock = jest
                .spyOn(cardsRepository, 'findAllFromCurrentUser')
                .mockResolvedValue([]);

            await sut.calculateTotalTimeForToday(userId);

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns value correctly', async () => {
            jest.spyOn(Date, 'now').mockReturnValue(currentDate.getTime());

            jest.spyOn(
                cardsRepository,
                'findAllFromCurrentUser',
            ).mockResolvedValue([
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 0,
                    finishedAtHours: 1,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 4,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 2,
                    finishedAtMinutes: 50,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 2,
                    finishedAtHours: 2,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 2,
                    finishedAtHours: 5,
                    finishedAtMinutes: 10,
                }),
            ]);

            const result = await sut.calculateTotalTimeForToday(userId);

            expect(result).toBeDefined();
            expect(result).toStrictEqual({
                date: currentDate,
                totalTime: {
                    hours: 1,
                    minutes: 30,
                },
            });
        });

        it('Should ensure method formats the value  correctly', async () => {
            jest.spyOn(
                cardsRepository,
                'findAllFromCurrentUser',
            ).mockResolvedValue([
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 0,
                    finishedAtHours: 4,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 0,
                    finishedAtHours: 2,
                    finishedAtMinutes: 40,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 2,
                    finishedAtMinutes: 40,
                }),
            ]);

            const result = await sut.calculateTotalTimeForToday(userId);

            expect(result).toBeDefined();

            expect(result.totalTime).toStrictEqual({
                hours: 7,
                minutes: 10,
            });
        });
    });

    describe('calculateTotalTimeForEachPreviousDay', () => {
        it('Should ensure method calls CardsRepository.findAllFromCurrentUser', async () => {
            const mock = jest
                .spyOn(cardsRepository, 'findAllFromCurrentUser')
                .mockResolvedValue([]);

            await sut.calculateTotalTimeForEachPreviousDay(userId);

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns value correctly', async () => {
            jest.spyOn(Date, 'now').mockReturnValue(currentDate.getTime());

            jest.spyOn(
                cardsRepository,
                'findAllFromCurrentUser',
            ).mockResolvedValue([
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 0,
                    finishedAtHours: 1,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 4,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 2,
                    finishedAtMinutes: 50,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 2,
                    finishedAtHours: 2,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 2,
                    finishedAtHours: 5,
                    finishedAtMinutes: 10,
                }),
            ]);

            const result = await sut.calculateTotalTimeForEachPreviousDay(
                userId,
            );

            expect(result).toBeDefined();
            expect(result).toHaveLength(2);
        });

        it('Should ensure method formats the value  correctly', async () => {
            jest.spyOn(
                cardsRepository,
                'findAllFromCurrentUser',
            ).mockResolvedValue([
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 4,
                    finishedAtMinutes: 30,
                }),
                CardsFactory.generateCardWithCustomDates({
                    currentDate,
                    createdAtDays: 1,
                    finishedAtHours: 2,
                    finishedAtMinutes: 40,
                }),
            ]);

            const result = await sut.calculateTotalTimeForEachPreviousDay(
                userId,
            );

            expect(result).toBeDefined();

            expect(result[0].totalTime).toStrictEqual({
                hours: 7,
                minutes: 10,
            });
        });
    });
});
