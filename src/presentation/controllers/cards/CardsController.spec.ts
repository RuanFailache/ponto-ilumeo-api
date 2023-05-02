import { Test } from '@nestjs/testing';

import { CardsUseCase } from '@application/use-cases';
import { CardsFactory } from '@test/factories/CardsFactory';
import { CardsModule } from '@infrastructure/modules/CardsModule';

import { CardsController } from './CardsController';
import { faker } from '@faker-js/faker';

describe('CardsController', () => {
    let sut: CardsController;

    let cardsUserCase: CardsUseCase;

    let mock: jest.SpyInstance;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CardsModule],
        }).compile();

        sut = moduleRef.get<CardsController>(CardsController);
        cardsUserCase = moduleRef.get<CardsUseCase>(CardsUseCase);
    });

    const request = {
        user: {
            id: faker.datatype.uuid(),
        },
    };

    describe('getCurrentUserTime', () => {
        beforeAll(() => {
            mock = jest
                .spyOn(cardsUserCase, 'calculateTotalTimeForToday')
                .mockResolvedValue({
                    date: faker.date.past(),
                    isFinished: true,
                    totalTime: {
                        hours: faker.datatype.number(24),
                        minutes: faker.datatype.number(60),
                    },
                });
        });

        it('Should ensure method calls CardsUserCase.calculateTotalTimeForToday', async () => {
            await sut.getCurrentUserTime(request);

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns correct values on success', async () => {
            const bodyResponse = await sut.getCurrentUserTime(request);

            expect(bodyResponse).toBeDefined();
            expect(bodyResponse.date).toBeDefined();
            expect(bodyResponse.totalTime).toBeDefined();
        });
    });

    describe('findAllFromCurrentUser', () => {
        beforeAll(() => {
            mock = jest
                .spyOn(cardsUserCase, 'calculateTotalTimeForEachPreviousDay')
                .mockResolvedValue([]);
        });

        it('Should ensure method calls CardsUserCase.getAllCardsWithUserId', async () => {
            await sut.findAllFromCurrentUser(request);

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns correct values on success', async () => {
            jest.spyOn(
                cardsUserCase,
                'calculateTotalTimeForEachPreviousDay',
            ).mockResolvedValue([
                CardsFactory.generateFakeCardEntity(),
                CardsFactory.generateFakeCardEntity(),
                CardsFactory.generateFakeCardEntity(),
            ]);

            const bodyResponse = await sut.findAllFromCurrentUser(request);

            expect(bodyResponse).toBeDefined();
            expect(bodyResponse).toHaveLength(3);
        });
    });
});
