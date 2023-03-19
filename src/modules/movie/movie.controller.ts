import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Movie } from './movie.interface';
import { MovieService } from './movie.service';
import { ApiQuery } from '@nestjs/swagger';
import { SearchMoviesDto } from './dto/search.dto';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private movieService: MovieService) {}
  @Get('search')
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'Movie title to search',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  async search(@Query() queryDto: SearchMoviesDto): Promise<Movie[]> {
    return this.movieService.search(queryDto.title);
  }
}
