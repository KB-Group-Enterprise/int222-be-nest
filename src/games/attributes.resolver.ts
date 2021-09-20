import { Query, Resolver } from '@nestjs/graphql';
import { AttributeService } from './attributes.service';
import { Category } from './entities/category.entity';
import { Publisher } from './entities/publisher.entity';
import { Retailer } from './entities/retailer.entity';

@Resolver()
export class AttributeResolver {
  constructor(private attService: AttributeService) {}

  @Query(() => [Category])
  categories() {
    return this.attService.getAllCategories();
  }

  @Query(() => [Publisher])
  publishers() {
    return this.attService.getAllPublishers();
  }

  @Query(() => [Retailer])
  retailers() {
    return this.attService.getAllRetailers();
  }
}
