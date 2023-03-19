import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.entity";
import { ApiResponse } from "../../common/api-response.dto";
import { TodoCreateDto } from "./dto/create-todo.dto";
import { TodoUpdateDto } from "./dto/update-todo";

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Todo[]>> {
    try {
      const data = await this.todoService.findAll();
      return ApiResponse.success('Todos fetched successfully.', data);
    } catch (error) {
      throw new HttpException(
        ApiResponse.failure('Failed to fetch todos.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  async create(@Body() todo: TodoCreateDto): Promise<ApiResponse<Todo>> {
    try {
      const data = await this.todoService.create(todo);
      return ApiResponse.success('Todo created successfully.', data);
    } catch (error) {
      throw new HttpException(
        ApiResponse.failure('Failed to create todo.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() todo: TodoUpdateDto,
  ): Promise<ApiResponse<Todo>> {
    try {
      const data = await this.todoService.update(id, todo);
      return ApiResponse.success('Todo updated successfully.', data);
    } catch (error) {
      throw new HttpException(
        ApiResponse.failure('Failed to update todo.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ApiResponse<null>> {
    try {
      await this.todoService.delete(id);
      return ApiResponse.success('Todo deleted successfully.');
    } catch (error) {
      throw new HttpException(
        ApiResponse.failure('Failed to delete todo.', error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
