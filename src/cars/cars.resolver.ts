import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { GetCarArgs } from './dto/args/get-car.args';
import { DeleteCarInput } from './dto/inputs/delete-car.input';
import { NewCarInput } from './dto/inputs/new-car.input';
import { UpdateCarInput } from './dto/inputs/update-car.input';
import { Car } from './entities/cars.entity';

@Resolver()
export class CarsResolver {
  constructor(private carService: CarsService) {}

  @Query((returns) => [Car])
  public async cars(): Promise<Car[]> {
    return this.carService.getAllCars().catch((err) => {
      throw err;
    });
  }
  @Query((returns) => Car)
  async car(@Args() carArg: GetCarArgs): Promise<Car> {
    return this.carService.getCar(carArg);
  }

  @Mutation((returns) => Car)
  public async addCar(@Args('newCarData') newCarData: NewCarInput) {
    return this.carService.addNewCar(newCarData).catch((err) => {
      throw err;
    });
  }
  @Mutation((returns) => Car)
  async updateCar(@Args('updatedCarData') updatedCarData: UpdateCarInput) {
    return this.carService.updateCar(updatedCarData).catch((err) => {
      throw err;
    });
  }
  @Mutation((returns) => Car)
  deleteCar(@Args('deleteCarData') deleteCarData: DeleteCarInput) {
    return this.carService.deleteCar(deleteCarData);
  }
}
