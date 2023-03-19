import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import { User } from '../user/user.model';
import { Movie } from '../movie/movie.model';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.interface';

@Controller('rankings')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRanking(
    @Req() req,
    @Body() body: { movieId: number; rank: number },
  ): Promise<void> {
    const user: User = req.user;
    const movie: Movie = await Movie.query().findById(body.movieId);
    await this.rankingService.addRanking(user, movie, body.rank);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserRankings(@Req() req): Promise<Ranking[]> {
    const user: User = req.user;
    return this.rankingService.getUserRankings(user);
  }

  @Get('top')
  async getTopMovies(): Promise<Movie[]> {
    return this.rankingService.getTopMovies(10);
  }
}
