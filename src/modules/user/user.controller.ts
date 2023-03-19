import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiResponse } from '../../common/api-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  async signUp(
    @Body() user: CreateUserDto,
  ): Promise<ApiResponse<User | Error>> {
    try {
      const foundUser = await this.userService.findOneByEmail(user.email);
      if (foundUser) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      const createdUser = await this.userService.createUser(user);
      return ApiResponse.success('Registration was successful.', createdUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(
          ApiResponse.failure('User registration failed.', error.message),
          error.getStatus(),
        );
      }
      throw new HttpException(
        ApiResponse.failure('Failed Sign up user.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
