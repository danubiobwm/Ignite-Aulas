import { Router } from 'express';
import { Category } from 'model/Category';
import { v4 as uuidv4 } from 'uuid';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
    created_at: new Date()
  })

  categories.push(category);

  return response.status(201).json(categories);
});

export { categoriesRoutes };
