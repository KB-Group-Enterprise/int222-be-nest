import { Injectable, Logger } from '@nestjs/common';
import { GameSeederService } from './game/game.service';
import { UserSeederService } from './user/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly gameSeederService: GameSeederService,
    private readonly userSeederService: UserSeederService,
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
    await this.roles()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding roles...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding roles...');
        Promise.reject(error);
      });
    await this.questions()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding questions...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding questions...');
        Promise.reject(error);
      });
    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
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
  async roles() {
    return await Promise.all(this.userSeederService.createRole())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Roles created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  async questions() {
    return await Promise.all(this.userSeederService.createQuestion())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Question created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  async users() {
    return await Promise.all(this.userSeederService.createUser())
      .then((createdRows) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of User created : ' +
            // Remove all null values and return only created languages.
            createdRows.filter((nullValueOrCreatedRow) => nullValueOrCreatedRow)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
