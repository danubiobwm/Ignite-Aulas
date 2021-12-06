import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class listAvailableCarsControlle {
  async handle(request: Request, response: Response) {
    const { brand, name, category_id } = request.query;
    const listAvailableCarsControlle = container.resolve(ListAvailableCarsUseCase);

    const cars =  await listAvailableCarsControlle.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    })
  }
}

export { listAvailableCarsControlle }
