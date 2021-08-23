import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGameArgs } from './dto/args/get-game.args';
import { DeleteGameInput } from './dto/inputs/delete-game.input';
import { NewGameInput } from './dto/inputs/new-game.input';
import { UpdateGameInput } from './dto/inputs/update-game.input';
import { DeleteGameOutput } from './dto/outputs/delete-game.output';
import { Game } from './entities/game.entity';
@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  public async getAllGames(): Promise<Game[]> {
    try {
      const games = await this.gameRepository.find({
        relations: ['publisher', 'categories', 'retailers'],
      });
      console.log(games);
      return games;
    } catch (err) {
      console.error(err);
      if (err) throw new NotFoundException();
    }
  }

  public async getGame(gameArgs: GetGameArgs): Promise<Game> {
    return await this.gameRepository
      .findOneOrFail(gameArgs.gameId, {
        relations: ['publisher', 'categories', 'retailers'],
      })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  public async addNewGame(newGameData: NewGameInput): Promise<Game> {
    const newGame = this.gameRepository.create(newGameData);
    await this.gameRepository.save(newGame).catch(() => {
      throw new InternalServerErrorException();
    });
    return newGame;
  }

  public async deleteGame(
    deleteGameData: DeleteGameInput,
  ): Promise<DeleteGameOutput> {
    await this.gameRepository.findOneOrFail(deleteGameData.gameId).catch(() => {
      throw new NotFoundException();
    });
    await this.gameRepository
      .delete({ gameId: deleteGameData.gameId })
      .catch((err) => {
        throw new InternalServerErrorException();
      });
    return { gameId: deleteGameData.gameId, status: 'success' };
  }

  public async updateGame(updateGameData: UpdateGameInput): Promise<Game> {
    const oldGameData = await this.gameRepository
      .findOneOrFail({
        gameId: updateGameData.gameId,
      })
      .catch((err) => {
        throw new NotFoundException();
      });
    return await this.gameRepository.save({
      ...oldGameData,
      ...updateGameData,
    });
  }
}
