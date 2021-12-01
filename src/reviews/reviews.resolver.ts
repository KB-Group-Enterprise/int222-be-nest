import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { ResponseStatus } from 'src/common/graphql/commons.class';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { FindReviewByUserArgs } from './dto/args/find-review-by-user.args';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(GqlAuthGuard)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Query(() => [Review], { name: 'reviewByGameId' })
  findByGameId(@Args('id', { type: () => Int }) id: number) {
    return this.reviewsService.findbyGameId(id);
  }

  @Query(() => [Review], { name: 'reviewByUserId' })
  @UseGuards(GqlAuthGuard)
  findByUserId(@Args('id', { type: () => String }) userId: string) {
    return this.reviewsService.findReviewsByUser({ userId });
  }

  @Mutation(() => Review)
  @UseGuards(GqlAuthGuard)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(updateReviewInput);
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  deleteReview(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponseStatus> {
    return this.reviewsService.remove(id);
  }
}
