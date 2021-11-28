import {
  BadRequestException,
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
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { GamesPaginationArgs } from './dto/args/pagination.args';
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

  public async paginateAndFilter({
    limit,
    page,
    filterBy,
    filter,
    sortBy,
    order,
  }: GamesPaginationArgs): Promise<Pagination<Game>> {
    const paginateOption: IPaginationOptions = {
      limit,
      page,
    };
    if (!filterBy && !sortBy) {
      return paginate<Game>(this.gameRepository, paginateOption);
    } else {
      const queryBuilder = this.gameRepository
        .createQueryBuilder('games')
        .leftJoinAndSelect('games.publisher', 'publisher');
      if (filterBy.includes('publisher')) {
        queryBuilder.where('games.publisher = :publisherId', {
          publisherId: filter[filterBy.indexOf('publisher')],
        });
      } else if (filterBy.includes('category')) {
        queryBuilder.innerJoin(
          'games.categories',
          'category',
          'category.category_id = :categoryId',
          { categoryId: filter[filterBy.indexOf('publisher')] },
        );
      } else if (filterBy.includes('retailer')) {
        queryBuilder.innerJoin(
          'games.retailers',
          'retailer',
          'retailer.retailer_id = :retailerId',
          { retailerId: filter[filterBy.indexOf('retailer')] },
        );
      }
      if (sortBy) queryBuilder.orderBy(sortBy, order || 'ASC');
      const paginateResult = await paginate<Game>(queryBuilder, paginateOption);
      const fullGame: Promise<Game>[] = paginateResult.items.map(
        async (game: Game) => {
          return await this.gameRepository.findOne(game.gameId);
        },
      );
      await Promise.all(fullGame);
      (paginateResult as any).items = fullGame;
      return paginateResult;
    }
  }

  public async findGameByName(gameName: string) {
    try {
      if (!gameName) return [];
      const result = await this.gameRepository
        .createQueryBuilder('games')
        // .leftJoinAndSelect('games.publisher', 'publisher')
        // .leftJoinAndSelect('games.categories', 'category')
        // .leftJoinAndSelect('games.retailers', 'retailer')
        .leftJoinAndSelect('games.images', 'image')
        .where('LOWER(game_name) LIKE LOWER(:gameName)', {
          gameName: `%${gameName}%`,
        })
        .orderBy('rating', 'DESC')
        .getMany();
      return result;
    } catch (e) {
      console.log(e);
      throw new NotFoundException('No Game By This Name');
    }
  }

  public async addNewGame(newGameData: NewGameInput): Promise<Game> {
    const newGame = this.gameRepository.create(newGameData);
    return this.gameRepository.save(newGame).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async deleteImagesByGame(gameId: number) {
    const oldImages = await this.gameImageRepository.find({
      game: { gameId: gameId },
    });
    if (oldImages.length > 0) {
      const oldImagesName = oldImages.map((imgObj) => imgObj.name);
      await this.uploadService.deleteFiles(oldImagesName, SUBFOLDER.GAMES);
      oldImages.forEach((imgObj) => {
        this.gameImageRepository.delete(imgObj.id);
      });
    }
  }

  public async saveGameWithUploads(
    newGameData: NewGameInput | UpdateGameInput,
    uploads: Upload[],
  ): Promise<Game> {
    if (newGameData instanceof NewGameInput) {
      const existsByName = await this.findGameByName(newGameData.gameName);
      if (existsByName.length > 0)
        throw new BadRequestException('This game name existed');
    }
    const game = await this.gameRepository.save(newGameData);
    const imageNames = await this.uploadService.multipleUpload(
      uploads,
      SUBFOLDER.GAMES,
    );
    this.deleteImagesByGame(game.gameId);
    imageNames.forEach(async (name) => {
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
    this.deleteImagesByGame(gameId);
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
