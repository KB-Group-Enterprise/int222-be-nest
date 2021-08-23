import { Injectable, Logger } from '@nestjs/common';
import { GameSeederService } from './game/game.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly gameSeederService: GameSeederService,
  ) {}
  async seed() {
    await this.categories()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding categories...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding categories...');
        Promise.reject(error);
      });
    await this.publishers()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding publishers...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding publishers...');
        Promise.reject(error);
      });
    await this.retailers()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding retailers...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding retailers...');
        Promise.reject(error);
      });
    await this.games()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding games...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding games...');
        Promise.reject(error);
      });
  }
  async categories() {
    return await Promise.all(this.gameSeederService.createCategories())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of categories created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  async publishers() {
    return await Promise.all(this.gameSeederService.createPublishers())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Publishers created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  async retailers() {
    return await Promise.all(this.gameSeederService.createRetailer())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Retailers created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  async games() {
    return await Promise.all(this.gameSeederService.createGames())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Games created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
