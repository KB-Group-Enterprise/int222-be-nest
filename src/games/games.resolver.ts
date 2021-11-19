import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { DeleteGameArgs } from './dto/args/delete-game.args';
import { GetGameArgs } from './dto/args/get-game.args';
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

  @Query(() => Game)
  public async gameWithReviews(@Args() gameArgs: GetGameArgs): Promise<Game> {
    return this.gameService.getGame(gameArgs, [
      'reviews',
      'reviews.reviewer',
      'reviews.votes',
      'reviews.votes.user',
    ]);
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
  public async addGameWithImages(
    @Args('newGameData') newGameData: NewGameInput,
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: Upload[],
  ) {
    return this.gameService
      .saveGameWithUploads(newGameData, files)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => Game)
  public async updateGameWithImages(
    @Args('newGameData') updateGameData: UpdateGameInput,
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: Upload[],
  ) {
    return this.gameService.saveGameWithUploads(updateGameData, files);
  }

  @Mutation(() => Game)
  public async updateGame(
    @Args('updateGameData') updateGameData: UpdateGameInput,
  ): Promise<Game> {
    return this.gameService.updateGame(updateGameData);
  }

  @Mutation(() => DeleteGameOutput)
  public async deleteGame(
    @Args() deleteGameArgs: DeleteGameArgs,
  ): Promise<DeleteGameOutput> {
    return this.gameService.deleteGame(deleteGameArgs.gameId);
  }
}
