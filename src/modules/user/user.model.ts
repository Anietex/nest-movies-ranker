import { BaseModel } from '../../common/base-model';

export class User extends BaseModel {
  static tableName = 'users';

  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}
