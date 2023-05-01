import { Test } from '@nestjs/testing';
import { CardsController } from './cards.controller';

describe('CardsController', () => {
    let sut: CardsController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CardsController],
        }).compile();

        sut = moduleRef.get<CardsController>(CardsController);
    });

    describe('findAllFromCurrentUser', () => {
        it('Should ensure method returns correct values on success', async () => {
            const bodyResponse = await sut.findAllFromCurrentUser();

            expect(bodyResponse.today).toBeDefined();
            expect(bodyResponse.previous).toBeDefined();
        });
    });
});
