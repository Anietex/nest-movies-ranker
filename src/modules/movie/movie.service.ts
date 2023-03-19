import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TmdbApiHelper } from '../../common/tmbd-api';
import { Movie as IMovies } from './movie.interface';
import { MovieRepository } from './movie.repository';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async findByImdbId(imdb_id: string): Promise<Movie> {
    return this.movieRepository.findByImdbId(imdb_id);
  }

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  async search(title: string): Promise<IMovies[]> {
    try {
      const response = await TmdbApiHelper.searchMovies(title);
      return response.results.map((movie: IMovies) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      }));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
