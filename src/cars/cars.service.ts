import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCarArgs } from './dto/args/get-car.args';
import { DeleteCarInput } from './dto/inputs/delete-car.input';
import { NewCarInput } from './dto/inputs/new-car.input';
import { UpdateCarInput } from './dto/inputs/update-car.input';
import { Car } from './entities/cars.entity';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  public async getAllCars(): Promise<Car[]> {
    try {
      const cars = await this.carRepository.find({});
      return cars;
    } catch (err) {
      if (err) throw new NotFoundException();
    }
  }
  async getCar(carArg: GetCarArgs): Promise<Car> {
    return await this.carRepository.findOne(carArg.id).catch((err) => {
      throw new NotFoundException();
    });
  }
  public async addNewCar(newCarData: NewCarInput): Promise<Car> {
    const newCar = this.carRepository.create(newCarData);
    await this.carRepository.save(newCar).catch((err) => {
      throw new InternalServerErrorException();
    });
    return newCar;
  }
  async updateCar(updatedCarData: UpdateCarInput): Promise<Car> {
    const oldCarData = await this.carRepository
      .findOne({ id: updatedCarData.id })
      .catch((err) => {
        throw new NotFoundException();
      });
    return await this.carRepository.save({
      ...oldCarData,
      ...updatedCarData,
    });
  }
  async deleteCar(deleteCarData: DeleteCarInput): Promise<DeleteCarInput> {
    await this.carRepository
      .delete({
        id: deleteCarData.id,
      })
      .catch((err) => {
        throw new NotFoundException();
      });
    return deleteCarData;
  }
}
