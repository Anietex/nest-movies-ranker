import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.update(id, todo);
  }

  async delete(id: number): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
