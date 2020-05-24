
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Callback } from '../models/callback';
import { Logger } from '@overnightjs/logger';

@Controller('api/callbacks')
export class CallbackApiController  {
    @Get()
    private get(req: Request, res: Response) {
        Callback.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(callbacks => {
            res.status(200).json(callbacks);
        }).catch(err => {
            Logger.Err(err.message);
        });
    }
}


