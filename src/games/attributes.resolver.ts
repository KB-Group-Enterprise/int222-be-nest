import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { ROLES } from 'src/authorization/ROLES';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { AttributeService } from './attributes.service';
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
import { DeleteOutput } from './dto/outputs/delete-output';
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

  @Query(() => Category)
  category(@Args() getCategoryArgs: GetCategoryArgs) {
    return this.attService.getCategory(getCategoryArgs);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  async addCategory(@Args('addCategoryData') addCategoryData: NewCategoryInput) {
    return this.attService.createCategory(addCategoryData);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  updateCategory(
    @Args('updateCategoryData') updateCategoryData: CategoryInput,
  ) {
    return this.attService.updateCategory(updateCategoryData);
  }

  @Mutation(() => DeleteOutput)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  deleteCategory(@Args() deleteCategoryData: DeleteCategoryArgs) {
    return this.attService.deleteCategory(deleteCategoryData);
  }

  @Query(() => [Publisher])
  publishers() {
    return this.attService.getAllPublishers();
  }

  @Query(() => Publisher)
  publisher(@Args() getPublisherArgs: GetPublisherArgs) {
    return this.attService.getPublisher(getPublisherArgs);
  }

  @Mutation(() => Publisher)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  addPublisher(@Args('addPublisherData') addPublisherData: NewPublisherInput) {
    return this.attService.createPublisher(addPublisherData);
  }

  @Mutation(() => Publisher)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  updatePublisher(
    @Args('updatePublisherData') updatePublisherData: PublisherInput,
  ) {
    return this.attService.updatePublisher(updatePublisherData);
  }

  @Mutation(() => DeleteOutput)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  deletePublisher(@Args() deletePublisherData: DeletePublisherArgs) {
    return this.attService.deletePublisher(deletePublisherData);
  }

  @Query(() => [Retailer])
  retailers() {
    return this.attService.getAllRetailers();
  }

  @Query(() => Retailer)
  retailer(@Args() getRetailerArgs: GetRetailerArgs) {
    return this.attService.getRetailer(getRetailerArgs);
  }

  @Mutation(() => Retailer)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  addRetailer(@Args('addRetailerData') addRetailerData: NewRetailerInput) {
    return this.attService.createRetailer(addRetailerData);
  }

  @Mutation(() => Retailer)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  updateRetailer(
    @Args('updateRetailerData') updateRetailerData: RetailerInput,
  ) {
    return this.attService.updateRetailer(updateRetailerData);
  }

  @Mutation(() => DeleteOutput)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  deleteRetailer(@Args() deleteRetailerData: DeleteRetailerArgs) {
    return this.attService.deleteRetailer(deleteRetailerData);
  }
}
