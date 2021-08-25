import { IGame } from 'src/games/interface/game';
import { User } from 'src/users/entities/users.entity';

export interface IReview {
  reviewId?: number;
  rating: number;
  comment: string;
  reviewer: Partial<User>;
  game: IGame;
}

export interface IVote {
  voteId?: number;
  vote: number;
  review: IReview;
  game: IGame;
}
