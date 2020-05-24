import { Table, Model, Column, Index } from 'sequelize-typescript';

@Table
export class Callback extends Model<Callback> {
    @Column
    to: string;
    @Column
    from: string;
}