import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { ResponseStatus } from 'src/common/graphql/commons.class';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
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

  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(updateReviewInput);
  }

  @Mutation(() => ResponseStatus)
  deleteReview(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponseStatus> {
    return this.reviewsService.remove(id);
  }
}
