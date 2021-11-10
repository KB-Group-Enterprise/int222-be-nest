import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseStatus } from 'src/common/graphql/commons.class';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { Vote } from './entities/vote.entity';
import { IVote } from './interface/votes';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  public async create(createVoteInput: CreateVoteInput) {
    const isExist = await this.voteRepository.findOne(
      {
        review: { reviewId: createVoteInput.reviewId },
        user: { userId: createVoteInput.userId },
      },
      {
        relations: ['review', 'user'],
      },
    );
    if (isExist) {
      throw new BadRequestException('User already voted this reviews');
    }
    try {
      const newVote: IVote = {
        review: await this.reviewRepository.findOneOrFail(
          createVoteInput.reviewId,
        ),
        user: await this.userRepository.findOneOrFail(createVoteInput.userId),
        isUpvote: createVoteInput.isUpvote,
      };
      return await this.voteRepository.save(newVote);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async findAll() {
    return this.voteRepository
      .find({ relations: ['review', 'user'] })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  public async update(updateVoteInput: UpdateVoteInput) {
    const oldVoteData: Vote = await this.voteRepository
      .findOneOrFail(updateVoteInput.voteId)
      .catch((err) => {
        throw new NotFoundException();
      });
    try {
      const newReview: Partial<Vote> = {
        isUpvote: updateVoteInput.isUpvote,
      };
      Object.assign(oldVoteData, newReview);
      return this.voteRepository.save(oldVoteData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async remove(id: number): Promise<ResponseStatus> {
    await this.voteRepository.delete({ voteId: id }).catch((err) => {
      throw new InternalServerErrorException();
    });
    return { status: 200, message: 'success' };
  }
}
