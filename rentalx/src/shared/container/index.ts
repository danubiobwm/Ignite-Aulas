import { container } from 'tsyringe';

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

import {IUsersRepository} from '@modules/accounts/repositories/IUsersRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';

import { UsersRepository } from '@modules/accounts/infra/repositories/UserRepository';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
   SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)
