import {Table, Column, Model, HasMany} from 'sequelize-typescript';
 
@Table
export class Configuration extends Model<Configuration> {
 
  @Column
  AMI_username: string;
 
  @Column
  AMI_server: string;

  @Column
  AMI_password: string;

  @Column
  AMI_port: number;

  @Column
  baseUrl: string;

  @Column
  authKey: string;
  
  @Column 
  defaultResponsibles: string;

  @Column
  incomingStartCallEvent: string;
  @Column
  incomingStartCallField: string;
  @Column
  incomingEndCallEvent: string;
  @Column
  incomingEndCallField: string;
  @Column
  incomingAnswerCallEvent: string;
  @Column
  incomingAnswerCallField: string;
  @Column
  incomingStartCallValue: string;
  @Column
  incomingEndCallValue: string;
  @Column
  incomingAnswerCallValue: string;
  @Column
  incomingStartCallEvent2: string;
  @Column
  incomingStartCallField2: string;
  @Column
  incomingEndCallEvent2: string;
  @Column
  incomingEndCallField2: string;
  @Column
  incomingAnswerCallEvent2: string;
  @Column
  incomingAnswerCallField2: string;
  @Column
  incomingStartCallValue2: string;
  @Column
  incomingEndCallValue2: string;
  @Column
  incomingAnswerCallValue2: string;

  @Column
  callbackTimeout: number;

  @Column
  callbackContext: string;

  @Column
  uniqueFieldName: string; 
}