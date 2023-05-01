import { Test } from '@nestjs/testing';

import { CardsUseCase } from '@application/use-cases';
import { CardsFactory } from '@test/factories/CardsFactory';
import { CardsModule } from '@infrastructure/modules/CardsModule';

import { CardsController } from './CardsController';

describe('CardsController', () => {
    let sut: CardsController;

    let cardsUserCase: CardsUseCase;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CardsModule],
        }).compile();

        sut = moduleRef.get<CardsController>(CardsController);
        cardsUserCase = moduleRef.get<CardsUseCase>(CardsUseCase);
    });

    describe('findAllFromCurrentUser', () => {
        it('Should ensure method calls CardsUserCase.getAllCardsWithUserId', async () => {
            const mock = jest
                .spyOn(cardsUserCase, 'getAllPreviousCardsWithUserId')
                .mockResolvedValue([]);

            await sut.findAllFromCurrentUser();

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns correct values on success', async () => {
            jest.spyOn(
                cardsUserCase,
                'getAllPreviousCardsWithUserId',
            ).mockResolvedValue([
                CardsFactory.generateFakeCardEntity(),
                CardsFactory.generateFakeCardEntity(),
                CardsFactory.generateFakeCardEntity(),
            ]);

            const bodyResponse = await sut.findAllFromCurrentUser();

            expect(bodyResponse).toBeDefined();
            expect(bodyResponse).toHaveLength(3);
        });
    });
});
