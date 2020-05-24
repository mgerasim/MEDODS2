import { Table, Model, Column, Index } from 'sequelize-typescript';

@Table
export class Call extends Model<Call> {
    @Column
    call_start: Date;
    @Column
    call_answer: Date;
    @Column
    call_end: Date;
    @Index({
        name: 'pbx-call-index',
        type: 'UNIQUE'
      })
    @Column
    pbx_call_id: string;
    @Column
    caller_id: string;
    @Column
    duration: number;
    @Column
    internal: string;
    @Column
    call_filename: string;
    @Column
    responsibles: string;
    @Column
    called_phone_number: string;
}