import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesResolver } from './votes.resolver';
import { Review } from 'src/reviews/entities/review.entity';
import { Vote } from './entities/vote.entity';
import { User } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Review, User])],
  providers: [VotesResolver, VotesService],
  exports: [VotesService],
})
export class VotesModule {}
