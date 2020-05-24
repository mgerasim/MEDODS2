import { Table, Model, Column, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Call } from './call';

@Table
export class Variable extends Model<Variable> {
  @Column
  title: string;
  @Column
  value: string;
  @Index({
    name: 'pbx-call-index',
  })
  @Column
  pbx_call_id: string;
  @Column
  response: string;
}