import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseStatus } from 'src/common/graphql/commons.class';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './entities/review.entity';
import { IReview } from './interface/review';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  public async create(createReviewInput: CreateReviewInput) {
    try {
      const newReview: IReview = await {
        comment: createReviewInput.comment,
        rating: createReviewInput.rating,
        game: await this.gameRepository.findOneOrFail(createReviewInput.gameId),
        reviewer: await this.userRepository.findOneOrFail(
          createReviewInput.userId,
        ),
      };
      this.calculateReview(newReview.game.gameId);
      return await this.reviewRepository.save(newReview);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  public async calculateReview(gameId: number) {
    const game = await this.gameRepository.findOneOrFail(gameId).catch(() => {
      throw new NotFoundException('No game found during rating calculation.');
    });
    const reviews: Review[] = await this.reviewRepository.find({
      game,
    });
    if (reviews.length < 1) return;
    const ratings = reviews.map((review) => review.rating);
    let total = 0;
    ratings.forEach((rating) => {
      total += rating;
    });
    game.rating = total;
    return this.gameRepository.update(game.gameId, game);
  }

  public async findAll() {
    return await this.reviewRepository
      .find({
        relations: ['game', 'reviewer'],
      })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  public async findOne(id: number) {
    return await this.reviewRepository
      .findOneOrFail(id, {
        relations: ['game', 'reviewer', 'votes', 'votes.user'],
      })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  public async findbyGameId(gameId: number) {
    const reviews = await this.reviewRepository.find({
      relations: ['game', 'reviewer', 'votes', 'votes.user'],
      where: {
        game: { gameId },
      },
    });
    return reviews;
  }

  public async update(updateReviewInput: UpdateReviewInput) {
    const oldReviewData: Review = await this.reviewRepository
      .findOneOrFail({
        reviewId: updateReviewInput.reviewId,
      })
      .catch((err) => {
        throw new NotFoundException();
      });
    try {
      const newReview: Partial<Review> = {
        comment: updateReviewInput.comment,
        rating: updateReviewInput.rating,
      };
      Object.assign(oldReviewData, newReview);
      this.calculateReview(updateReviewInput.gameId);
      return this.reviewRepository.save(oldReviewData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async remove(id: number): Promise<ResponseStatus> {
    await this.reviewRepository.delete({ reviewId: id }).catch((err) => {
      throw new InternalServerErrorException();
    });
    return { status: 200, message: 'success' };
  }
}
