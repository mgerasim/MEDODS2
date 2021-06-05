import { Table, Model, Column, Index } from 'sequelize-typescript';

@Table
export class Replacement extends Model<Replacement> {
    @Column
    src: string;
    @Column
    dist: string;
}