import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";
import { Test } from '@nestjs/testing';

describe('CatsController', () => {
   let catsController: CatsController;
   let catsService: CatsService;

   beforeEach(async () => {
       const moduleRef = await Test.createTestingModule({
           controllers: [CatsController],
           providers: [CatsService],
       }).compile();

       catsService = moduleRef.get(CatsService);
       catsController = moduleRef.get(CatsController);
   })

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = ['test'];
            jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

            expect(await catsController.findAll()).toBe(result);
        });
    });
});
