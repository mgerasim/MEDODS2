
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Configuration } from '../models/configuration';
import { Call } from '../models/call';
import { Variable } from '../models/variable';
import { Event } from '../models/event';


@Controller('api/events')
export class EventController  {
    
    @Get()
    private getEventsB(req: Request, res: Response) {
        Logger.Info(req.params.pbxCallId);
        Event.findAll().then(events => {
            res.status(200).json(events);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}


