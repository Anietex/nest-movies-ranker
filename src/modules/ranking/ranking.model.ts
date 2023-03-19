import { Model } from 'objection';
import { User } from '../user/user.model';
import { Movie } from '../movie/movie.model';
import { BaseModel } from '../../common/base-model';

export class Ranking extends BaseModel {
  static get tableName() {
    return 'rankings';
  }

  id!: number;
  userId!: number;
  user?: User;
  movieId!: number;
  movie?: Movie;
  rank!: number;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'rankings.user_id',
          to: 'users.id',
        },
      },
      movie: {
        relation: Model.BelongsToOneRelation,
        modelClass: Movie,
        join: {
          from: 'rankings.movie_id',
          to: 'movies.id',
        },
      },
    };
  }
}
