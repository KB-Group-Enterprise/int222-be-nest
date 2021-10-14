import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteCategoryArgs } from './dto/args/delete-category.args';
import { DeletePublisherArgs } from './dto/args/delete-publisher.args';
import { DeleteRetailerArgs } from './dto/args/delete-retailer.args';
import { GetCategoryArgs } from './dto/args/get-category.args';
import { GetPublisherArgs } from './dto/args/get-publisher.args';
import { GetRetailerArgs } from './dto/args/get-retailer.args';
import { CategoryInput } from './dto/inputs/category.input';
import { NewCategoryInput } from './dto/inputs/new-category.input';
import { NewPublisherInput } from './dto/inputs/new-publisher.input';
import { NewRetailerInput } from './dto/inputs/new-retailer.input';
import { PublisherInput } from './dto/inputs/publisher.input';
import { RetailerInput } from './dto/inputs/retailer.input';
import { Category } from './entities/category.entity';
import { Publisher } from './entities/publisher.entity';
import { Retailer } from './entities/retailer.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Publisher) private publisherRepo: Repository<Publisher>,
    @InjectRepository(Retailer) private retailerRepo: Repository<Retailer>,
  ) {}

  public getAllCategories() {
    return this.categoryRepo.find();
  }

  public getCategory(args: GetCategoryArgs) {
    return this.categoryRepo.findOne(args.categoryId).catch(() => {
      throw new NotFoundException('Cannot Find Category');
    });
  }

  public createCategory(newCatgory: NewCategoryInput) {
    return this.categoryRepo.insert(newCatgory).catch(() => {
      throw new InternalServerErrorException('Canot Insert Category');
    });
  }

  public async updateCategory(categoryData: CategoryInput) {
    const category = await this.getCategory({
      categoryId: categoryData.categoryId,
    });
    Object.assign(category, categoryData);
    return this.categoryRepo.update(category.categoryId, category).catch(() => {
      throw new InternalServerErrorException('Cannot Update Category');
    });
  }

  public async deleteCategory(args: DeleteCategoryArgs) {
    return this.categoryRepo.delete(args.categoryId);
  }

  public getAllPublishers() {
    return this.publisherRepo.find();
  }

  public getPublisher(args: GetPublisherArgs) {
    return this.publisherRepo.findOne(args.publisherId).catch(() => {
      throw new NotFoundException('Cannot Find Publisher');
    });
  }

  public createPublisher(newPublisher: NewPublisherInput) {
    return this.publisherRepo.insert(newPublisher).catch(() => {
      throw new InternalServerErrorException('Canot Insert Publisher');
    });
  }

  public async updatePublisher(publisherData: PublisherInput) {
    const publisher = await this.getPublisher({
      publisherId: publisherData.publisherId,
    });
    Object.assign(publisher, publisherData);
    return this.publisherRepo
      .update(publisher.publisherId, publisher)
      .catch(() => {
        throw new InternalServerErrorException('Cannot Update Publisher');
      });
  }

  public async deletePublisher(args: DeletePublisherArgs) {
    return this.publisherRepo.delete(args.publisherId);
  }

  public getAllRetailers() {
    return this.retailerRepo.find();
  }

  public getRetailer(args: GetRetailerArgs) {
    return this.retailerRepo.findOne(args.retailerId).catch(() => {
      throw new NotFoundException('Cannot Find Retailer');
    });
  }

  public createRetailer(newRetailer: NewRetailerInput) {
    return this.retailerRepo.insert(newRetailer).catch(() => {
      throw new InternalServerErrorException('Canot Insert Retailer');
    });
  }

  public async updateRetailer(retailerData: RetailerInput) {
    const retailer = await this.getRetailer({
      retailerId: retailerData.retailerId,
    });
    Object.assign(retailer, retailerData);
    return this.retailerRepo.update(retailer.retailerId, retailer).catch(() => {
      throw new InternalServerErrorException('Cannot Update Retailer');
    });
  }

  public async deleteRetailer(args: DeleteRetailerArgs) {
    return this.retailerRepo.delete(args.retailerId);
  }
}
