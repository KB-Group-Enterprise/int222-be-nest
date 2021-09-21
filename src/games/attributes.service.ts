import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { Publisher } from "./entities/publisher.entity";
import { Retailer } from "./entities/retailer.entity";

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

  public getAllPublishers() {
    return this.publisherRepo.find();
  }

  public getAllRetailers() {
    return this.retailerRepo.find();
  }
}
