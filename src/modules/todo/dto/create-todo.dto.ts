import { IsNotEmpty, IsString } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
