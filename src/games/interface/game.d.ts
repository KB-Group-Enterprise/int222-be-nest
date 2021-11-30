import { Review } from 'src/reviews/entities/review.entity';

export interface IGame {
  gameId?: number;
  gameName: string;
  basePrice: number;
  description: string;
  publisher: Publisher;
  categories: Category[];
  retailers: Retailer[];
  releaseDate: string;
  rating?: number;
  images?: GameImage[];
  reviews?: Review[];
}

export interface IPublisher {
  publisherId: number;
  publisherName: string;
}

export interface ICategory {
  categoryId: number;
  categoryName: string;
}

export interface IRetailer {
  retailerId: number;
  retailerName: string;
}

export interface ReviewCount {
  gameId: number;
  count: number;
}
