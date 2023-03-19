import { knex } from '../config/database';
import { Model } from 'objection';

Model.knex(knex);

export abstract class BaseModel extends Model {}
