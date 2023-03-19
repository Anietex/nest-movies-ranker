// src/users/users.controller.ts
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
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
      const foundUser = await this.usersService.findOneByEmail(user.email);
      if (foundUser) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      const createdUser = await this.usersService.createUser(user);
      return ApiResponse.success('Registration was successful.', createdUser);
    } catch (error) {
      // if (error instanceof HttpException) {
      //   throw new HttpException(
      //     ApiResponse.failure('User registration failed.', error.message),
      //     error.getStatus(),
      //   );
      // }
      throw new HttpException(
        ApiResponse.failure('Failed Sign up user.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
