import { Injectable } from '@nestjs/common';
import { Ranking } from './ranking.model';

@Injectable()
export class RankingRepository {
  async addRanking(ranking: Partial<Ranking>): Promise<void> {
    await Ranking.query().insert(ranking);
  }
  async getRankingsForUser(userId: number): Promise<Ranking[]> {
    return Ranking.query()
      .where('userId', userId)
      .withGraphFetched('[user, movie]');
  }
  async getTopMovies(limit: number): Promise<Ranking[]> {
    return Ranking.query()
      .select('movieId')
      .count('movieId as count')
      .groupBy('movieId')
      .orderBy('count', 'desc')
      .limit(limit)
      .execute();
  }
}
