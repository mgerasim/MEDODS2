
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Callback } from '../models/callback';

@Controller('callback')
export class CallbackController  {
    @Get()
    private get(req: Request, res: Response) {
        
    }
}


