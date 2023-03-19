import { BaseModel } from '../../common/base-model';

export class Todo extends BaseModel {
  static tableName = 'todos';

  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;

  static get relationMappings() {
    return {
      // Add any relations here if needed
    };
  }

  static get jsonAttributes() {
    return ['completed', 'createdAt', 'updatedAt', 'title'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        completed: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }
}
