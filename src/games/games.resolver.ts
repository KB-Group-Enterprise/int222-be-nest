import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewGameInput } from './dto/inputs/new-game.input';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

@Resolver()
export class GamesResolver {
  constructor(private gameService: GamesService) {}
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
}
