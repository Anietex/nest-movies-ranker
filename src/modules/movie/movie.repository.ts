import { Injectable } from '@nestjs/common';
import { knex } from '../../config/database';
import { Movie } from './movie.model';

@Injectable()
export class MovieRepository {
  async findByImdbId(imdb_id: string): Promise<Movie> {
    return Movie.query().findOne({ imdb_id: imdb_id });
  }

  async create(movie: Movie): Promise<Movie> {
    return Movie.query().insert(movie);
  }

  async update(movie: Movie): Promise<Movie> {
    return Movie.query().upsertGraph(movie, { relate: true, unrelate: true });
  }

  async list(): Promise<Movie[]> {
    return Movie.query().orderBy('title');
  }

  async delete(id: number): Promise<void> {
    await knex('user_movies').where('movie_id', id).del();
    await Movie.query().deleteById(id);
  }
}
