import * as typeormNamingStrategies from 'typeorm-naming-strategies/index';

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new typeormNamingStrategies.SnakeNamingStrategy(),
  entities: ['dist/**/entities/*{.ts,.js}'],
  migrations: [process.env.TYPEORM_MIGRATION || 'src/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  logging: 'all',
};
