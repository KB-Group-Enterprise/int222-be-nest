import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewGameInput } from './dto/inputs/new-game.input';
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

  public async addNewGame(newGameData: NewGameInput): Promise<Game> {
    const newCar = this.gameRepository.create(newGameData);
    await this.gameRepository.save(newCar).catch(() => {
      throw new InternalServerErrorException();
    });
    return newCar;
  }
}
