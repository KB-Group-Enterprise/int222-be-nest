import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/games/entities/category.entity';
import { Game } from 'src/games/entities/game.entity';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Retailer } from 'src/games/entities/retailer.entity';
import {
  ICategory,
  IGame,
  IPublisher,
  IRetailer,
} from 'src/games/interface/game';
import { Repository } from 'typeorm';
import {
  categorySeeds,
  gameSeeds,
  publisherSeeds,
  retailerSeeds,
} from './data';

@Injectable()
export class GameSeederService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Retailer)
    private readonly retailerRepository: Repository<Retailer>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  createPublishers(): Array<Promise<Publisher>> {
    return publisherSeeds.map(async (publisher: IPublisher) => {
      return await this.publisherRepository
        .findOne(publisher.publisherId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.publisherRepository.save(publisher));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCategories(): Array<Promise<Category>> {
    return categorySeeds.map(async (category: ICategory) => {
      return await this.categoryRepository
        .findOne(category.categoryId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.categoryRepository.save(category));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createRetailer(): Array<Promise<Retailer>> {
    return retailerSeeds.map(async (retailer: IRetailer) => {
      return await this.retailerRepository
        .findOne(retailer.retailerId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.retailerRepository.save(retailer));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createGames(): Array<Promise<Game>> {
    return gameSeeds.map(async (game: IGame) => {
      return await this.gameRepository
        .findOne(game.gameId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.gameRepository.save(game));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
