
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Configuration } from '../models/configuration';
import { Call } from '../models/call';
import { Variable } from '../models/variable';
import { Event } from '../models/event';


@Controller('api/calls')
export class CallController  {
    @Get()
    private getCalls(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        Call.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(calls => {
            res.status(200).json(calls);
        }).catch(err => {
            Logger.Err(err.message);
        });
    }
    @Get(':pbxCallId/variables')
    private getVariablesByCall(req: Request, res: Response) {
        Logger.Info(req.params.pbxCallId);
        Variable.findAll({
            where: {
                pbx_call_id: req.params.pbxCallId
            }
        }).then(variables => {
            res.status(200).json(variables);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
    @Get(':pbxCallId/events')
    private getEventsByCall(req: Request, res: Response) {
        Logger.Info(req.params.pbxCallId);
        Event.findAll({
            where: {
                Linkedid: req.params.pbxCallId
            }
        }).then(events => {
            res.status(200).json(events);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    @Delete()
    private async deleteCallAll(req: Request, res: Response) {
        await Event.destroy({
            where: {},
            truncate: true
          });
        await Variable.destroy({
            where: {},
            truncate: true
          });
        await Call.destroy({
            where: {},
            truncate: true
          });
    }
}


