import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { ResponseStatus } from 'src/common/graphql/commons.class';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) {
    return this.votesService.create(createVoteInput);
  }

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.votesService.findAll();
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.votesService.update(updateVoteInput);
  }

  @Mutation(() => ResponseStatus)
  deleteVote(@Args('id', { type: () => Int }) id: number) {
    return this.votesService.remove(id);
  }
}
