import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
import { SUBFOLDER } from 'src/upload/enum/SUBFOLDER';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { UploadService } from 'src/upload/upload.service';
import { Repository } from 'typeorm';
import { GetGameArgs } from './dto/args/get-game.args';
import { NewGameInput } from './dto/inputs/new-game.input';
import { UpdateGameInput } from './dto/inputs/update-game.input';
import { DeleteGameOutput } from './dto/outputs/delete-game.output';
import { Game } from './entities/game.entity';
import { GameImage } from './entities/gameImage.entity';
@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(GameImage)
    private gameImageRepository: Repository<GameImage>,
    private uploadService: UploadService,
  ) {}

  public async getAllGames(): Promise<Game[]> {
    try {
      const games = await this.gameRepository.find({
        relations: ['publisher', 'categories', 'retailers', 'images'],
      });
      console.log(games);
      return games;
    } catch (err) {
      console.error(err);
      if (err) throw new NotFoundException();
    }
  }

  public async getGame(
    gameArgs: GetGameArgs,
    relations?: string[],
  ): Promise<Game> {
    if (!relations) relations = [];
    return await this.gameRepository
      .findOneOrFail(gameArgs.gameId, {
        relations: [
          'publisher',
          'categories',
          'retailers',
          'images',
          ...relations,
        ],
      })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  public async addNewGame(newGameData: NewGameInput): Promise<Game> {
    const newGame = this.gameRepository.create(newGameData);
    return this.gameRepository.save(newGame).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async saveGameWithUploads(
    newGameData: NewGameInput | UpdateGameInput,
    uploads: Upload[],
  ): Promise<Game> {
    const game = await this.gameRepository.save(newGameData);
    const imageNames = await this.uploadService.multipleUpload(
      uploads,
      SUBFOLDER.GAMES,
    );
    imageNames.forEach(async (name) => {
      const oldImages = await this.gameImageRepository.find({
        game: { gameId: game.gameId },
      });
      console.log(oldImages);
      if (oldImages.length > 0) {
        const oldImagesName = oldImages.map((imgObj) => imgObj.name);
        this.uploadService.deleteFiles(oldImagesName, SUBFOLDER.GAMES);
        oldImages.forEach((imgObj) => {
          this.gameImageRepository.delete(imgObj.id);
        });
      }
      await this.gameImageRepository.insert({
        game: { gameId: game.gameId },
        name,
      });
    });
    return this.getGame({ gameId: game.gameId });
  }

  public async deleteGame(gameId: number): Promise<DeleteGameOutput> {
    await this.gameRepository.findOneOrFail(gameId).catch(() => {
      throw new NotFoundException();
    });
    await this.gameRepository.delete(gameId).catch((err) => {
      throw new InternalServerErrorException();
    });
    return { gameId, status: 'success' };
  }

  public async updateGame(updateGameData: UpdateGameInput): Promise<Game> {
    const oldGameData = await this.gameRepository
      .findOneOrFail({
        gameId: updateGameData.gameId,
      })
      .catch((err) => {
        throw new NotFoundException();
      });
    await this.gameRepository.save(updateGameData);
    return await this.gameRepository.findOneOrFail(updateGameData.gameId);
  }
}
