import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { ROLES } from 'src/authorization/ROLES';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { DeleteGameArgs } from './dto/args/delete-game.args';
import { FindGameArgs } from './dto/args/find-game.args';
import { GetGameArgs } from './dto/args/get-game.args';
import { GamesPaginationArgs } from './dto/args/pagination.args';
import { NewGameInput } from './dto/inputs/new-game.input';
import { UpdateGameInput } from './dto/inputs/update-game.input';
import { DeleteGameOutput } from './dto/outputs/delete-game.output';
import { GamePaginationOutput } from './dto/outputs/game-pagination';
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
    return this.gameService.getAllGames();
  }

  @Query(() => [Game])
  public async searchGames(@Args() args: FindGameArgs): Promise<Game[]> {
    return this.gameService.findGameByName(args.gameName);
  }

  @Query(() => GamePaginationOutput)
  public async paginateGames(@Args() paginationArgs: GamesPaginationArgs) {
    return await this.gameService.paginateTest(paginationArgs);
  }
  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  public async addGame(@Args('newGameData') newGameData: NewGameInput) {
    return this.gameService.addNewGame(newGameData).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
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
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  public async updateGameWithImages(
    @Args('newGameData') updateGameData: UpdateGameInput,
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: Upload[],
  ) {
    return this.gameService.saveGameWithUploads(updateGameData, files);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  public async updateGame(
    @Args('updateGameData') updateGameData: UpdateGameInput,
  ): Promise<Game> {
    return this.gameService.updateGame(updateGameData);
  }

  @Mutation(() => DeleteGameOutput)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  public async deleteGame(
    @Args() deleteGameArgs: DeleteGameArgs,
  ): Promise<DeleteGameOutput> {
    return this.gameService.deleteGame(deleteGameArgs.gameId);
  }
}
