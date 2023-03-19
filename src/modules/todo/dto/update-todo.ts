import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class TodoUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
