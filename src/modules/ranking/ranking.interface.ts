import { User } from '../user/user.interface';
import { Movie } from '../movie/movie.interface';

export interface Ranking {
  id?: number;
  userId: number;
  user?: User;
  movieId: number;
  movie?: Movie;
  rank: number;
}
