import { Table, Model, Column, Index } from 'sequelize-typescript';

@Table
export class Event extends Model<Event> {
  @Column
  Event: string;
  @Column  
  Privilege: string;
  @Column
  Channel: string;
  @Column
  ChannelState: string;
  @Column
  ChannelStateDesc: string;
  @Column  
  CallerIDNum: string;
  @Column  
  CallerIDName: string;
  @Column  
  ConnectedLineNum: string;
  @Column  
  ConnectedLineName: string;
  @Column  
  Language: string;
  @Column
  AccountCode: string;
  @Column
  Context: string;
  @Column
  Exten: string;
  @Column
  Priority: string;
  @Column
  Uniqueid: string;
  @Index({
    name: 'pbx-call-index',
  })
  @Column  
  Linkedid: string;
  @Column  
  Cause: string;
  @Column  
  Variable: string;
  @Column  
  Value: string;
}