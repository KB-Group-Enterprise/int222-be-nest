import {
  ICategory,
  IGame,
  IPublisher,
  IRetailer,
} from 'src/games/interface/game';

export const categorySeeds: ICategory[] = [
  { categoryId: 1, categoryName: 'Action' },
  { categoryId: 2, categoryName: 'RPG' },
  { categoryId: 3, categoryName: 'FPS' },
  { categoryId: 4, categoryName: 'Strategy' },
];

export const publisherSeeds: IPublisher[] = [
  {
    publisherId: 1,
    publisherName: 'Steam',
  },
  {
    publisherId: 2,
    publisherName: 'Eelectronics Arts',
  },
  {
    publisherId: 3,
    publisherName: 'Ubisoft',
  },
  {
    publisherId: 4,
    publisherName: 'Bethesda',
  },
];

export const retailerSeeds: IRetailer[] = [
  { retailerId: 1, retailerName: 'Steam' },
  { retailerId: 2, retailerName: 'Origin' },
  { retailerId: 3, retailerName: 'Uplay' },
];

export const gameSeeds: IGame[] = [
  {
    gameId: 1,
    gameName: 'Half-Life 3',
    basePrice: 100.0,
    description: 'Game Very Good, POG.',
    categories: categorySeeds,
    publisher: publisherSeeds[0],
    retailers: [retailerSeeds[0]],
    images: [],
    reviews: [],
  },
];
