export interface IVote {
  voteId?: number;
  isUpvote: number;
  review: IReview;
  user: User;
}
