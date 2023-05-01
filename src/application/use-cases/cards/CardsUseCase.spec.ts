import { Test } from '@nestjs/testing';
import { CardsUseCase } from './CardsUseCase';
import { CardsModule } from '@infrastructure/modules/CardsModule';
import { CardsRepository } from '@infrastructure/database/repositories';

describe('CardsUseCase', () => {
    let sut: CardsUseCase;

    let cardsRepository: CardsRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CardsModule],
        }).compile();

        sut = moduleRef.get<CardsUseCase>(CardsUseCase);
        cardsRepository = moduleRef.get<CardsRepository>(CardsRepository);
    });

    describe('getAllCardsWithUserId', () => {
        it('Should ensure method calls CardsRepository.findAll', async () => {
            const mock = jest
                .spyOn(cardsRepository, 'findAll')
                .mockResolvedValue([]);

            await sut.getAllCardsWithUserId();

            expect(mock).toHaveBeenCalled();
        });
    });
});
