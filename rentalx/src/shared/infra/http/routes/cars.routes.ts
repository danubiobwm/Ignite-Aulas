import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const carsRouter = Router();

let createCarController = new CreateCarController();
let listAvailableCarsControlle = new ListCategoriesController();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRouter.get(
  '/available', listAvailableCarsControlle.handle

);

export { carsRouter };
