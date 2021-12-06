import { ICreateCarDto } from '../dto/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]>;
}

export { ICarsRepository };
