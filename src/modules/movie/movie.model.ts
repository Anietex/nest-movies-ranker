import { BaseModel } from '../../common/base-model';

export class Movie extends BaseModel {
  static tableName = 'movies';
  id: number;
  imdb_id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}
