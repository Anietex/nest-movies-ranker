import { Injectable } from '@nestjs/common';
import { RankingRepository } from './ranking.repository';
import { User } from '../user/user.model';
import { Movie } from '../movie/movie.model';
import { Ranking } from './ranking.model';
import { Ranking as IRanking } from './ranking.interface';

@Injectable()
export class RankingService {
  constructor(private readonly rankingRepository: RankingRepository) {}

  async addRanking(user: User, movie: Movie, rank: number): Promise<void> {
    const ranking: IRanking = { userId: user.id, movieId: movie.id, rank };
    await this.rankingRepository.addRanking(ranking);
  }

  async getUserRankings(user: User): Promise<Ranking[]> {
    return this.rankingRepository.getRankingsForUser(user.id);
  }

  async getTopMovies(limit: number): Promise<Movie[]> {
    const movieIds = await this.rankingRepository.getTopMovies(limit);
    const movies = await Movie.query().findByIds(movieIds.map((movie) => movie.movieId));
    return movies;
  }
}
