import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsControlle = new ListCategoriesController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get(
  '/available', listAvailableCarsControlle.handle
);

carsRoutes.post("/specifications/:id",
ensureAuthenticated,
ensureAdmin,
createCarSpecificationController.handle
);

export { carsRoutes };
