import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetGameArgs } from './dto/args/get-game.args';
import { DeleteGameInput } from './dto/inputs/delete-game.input';
import { NewGameInput } from './dto/inputs/new-game.input';
import { UpdateGameInput } from './dto/inputs/update-game.input';
import { DeleteGameOutput } from './dto/outputs/delete-game.output';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

@Resolver()
export class GamesResolver {
  constructor(private gameService: GamesService) {}

  @Query(() => Game)
  public async game(@Args() gameArgs: GetGameArgs): Promise<Game> {
    return this.gameService.getGame(gameArgs);
  }

  @Query(() => [Game])
  public async games(): Promise<Game[]> {
    return this.gameService.getAllGames().catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Game)
  public async addGame(@Args('newGameData') newGameData: NewGameInput) {
    return this.gameService.addNewGame(newGameData).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Game)
  public async updateGame(
    @Args('updateGameData') updateGameData: UpdateGameInput,
  ): Promise<Game> {
    return this.gameService.updateGame(updateGameData);
  }

  @Mutation(() => DeleteGameOutput)
  public async deleteGame(
    @Args('deleteGameData') deleteGameData: DeleteGameInput,
  ): Promise<DeleteGameOutput> {
    return this.gameService.deleteGame(deleteGameData);
  }
}
