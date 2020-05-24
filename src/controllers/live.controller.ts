
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('live')
export class LiveController  {
    @Get()
    private getLive(req: Request, res: Response) {
        res.status(200).send();
    }
}


