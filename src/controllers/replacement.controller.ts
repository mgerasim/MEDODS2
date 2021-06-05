
import { Request, Response } from 'express';
import { Controller, Get, Post, Put } from '@overnightjs/core';
import { Callback } from '../models/callback';
import { Logger } from '@overnightjs/logger';
import { Replacement } from '../models/replacement';

@Controller('api/replacements')
export class ReplacementController  {
    @Get()
    private get(req: Request, res: Response) {
        Replacement.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(replacements => {
            res.status(200).json(replacements);
        }).catch(err => {
            Logger.Err(err.message);
            res.status(500).send(err.message);
        });
    }
    @Post()
    private postReplacement(req: Request, res: Response) {
        const replacement: Replacement = new Replacement();
        Object.assign(replacement, req.body);
        replacement.save().then(result => {
            res.status(200).json({result: 'ok'});
        }, err => {
            res.status(500).send(err);
        });
    }
    
    @Put(':id')
    private putReplacement(req: Request, res: Response) {

        Replacement.findByPk(req.body.id).then(replacement => {

            Object.assign(replacement, req.body);
            replacement.save().then(result => {
                res.status(200).send(replacement);
            })
            .error(err => {
                res.status(500).send(err.message);
            })

        })
        .error(err => {
            res.status(500).send(err.message);
        });
    }
}


