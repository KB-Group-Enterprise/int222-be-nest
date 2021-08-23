export interface IGame {
  gameId?: number;
  gameName: string;
  basePrice: number;
  description: string;
  publisher: Publisher;
  categories: Category[];
  retailers: Retailer[];
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
