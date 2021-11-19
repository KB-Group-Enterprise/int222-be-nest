import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { ResponseStatus } from 'src/common/graphql/commons.class';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  @UseGuards(GqlAuthGuard)
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) {
    return this.votesService.create(createVoteInput);
  }

  @Query(() => [Vote], { name: 'votes' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.votesService.findAll();
  }

  @Mutation(() => Vote)
  @UseGuards(GqlAuthGuard)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.votesService.update(updateVoteInput);
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  deleteVote(@Args('id', { type: () => Int }) id: number) {
    return this.votesService.remove(id);
  }
}
