import { Test } from '@nestjs/testing';

import { CardsUseCase } from '@application/use-cases';

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
                .spyOn(cardsUserCase, 'getAllCardsWithUserId')
                .mockResolvedValue([]);

            await sut.findAllFromCurrentUser();

            expect(mock).toHaveBeenCalled();
        });

        it('Should ensure method returns correct values on success', async () => {
            const bodyResponse = await sut.findAllFromCurrentUser();

            expect(bodyResponse.today).toBeDefined();
            expect(bodyResponse.previous).toBeDefined();
        });
    });
});
