import { IsNotEmpty } from 'class-validator';

export class SearchMoviesDto {
  @IsNotEmpty()
  title: string;
}
