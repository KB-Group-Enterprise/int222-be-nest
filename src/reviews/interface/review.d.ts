import { IGame } from 'src/games/interface/game';
import { User } from 'src/users/entities/users.entity';

export interface IReview {
  reviewId?: number;
  rating: number;
  comment: string;
  reviewer: User;
  game: IGame;
}
