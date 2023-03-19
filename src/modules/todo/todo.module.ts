import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { KnexModule } from 'nestjs-knex';
import { config } from '../../config/database';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [KnexModule.forRoot({ config: config })],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
