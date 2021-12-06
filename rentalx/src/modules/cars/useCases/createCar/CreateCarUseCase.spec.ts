import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      id:'123',
      name: 'BWM',
      description: '270Fire',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Luxo'
    });
    expect(car).toHaveProperty('id')
  });
  it('Should not to able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        id:'123',
        name: 'BWM',
        description: '270Fire',
        daily_rate: 100,
        license_plate: 'abc-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Luxo'
      });
      await createCarUseCase.execute({
        id:'123',
        name: 'BWM1',
        description: '270Fire',
        daily_rate: 100,
        license_plate: 'abc-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Luxo'
      });
    }).rejects.toBeInstanceOf(AppError);
});

it('Should not to able to create a car with available true by default', async () => {
  const car = await createCarUseCase.execute({
    id:'123',
    name: 'Car Available',
    description: '270Fire',
    daily_rate: 100,
    license_plate: 'abcd-1234',
    fine_amount: 60,
    brand: 'Brand',
    category_id: 'Luxo'
  });
  expect(car.available).toBe(true);
});

});
