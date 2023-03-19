import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    return Todo.query();
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    console.log({ todo });
    return Todo.query().insert(todo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    return Todo.query().patchAndFetchById(id, todo);
  }

  async delete(id: number): Promise<void> {
    await Todo.query().deleteById(id);
  }
}
