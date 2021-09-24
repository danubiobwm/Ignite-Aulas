import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import {Router} from 'express';

const usersRoutes = Router();

const createCategoryController = new CreateCategoryController();

usersRoutes.post('/', createCategoryController.handle);

export {usersRoutes}
