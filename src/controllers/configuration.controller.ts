
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Configuration } from '../models/configuration';
import { ConfigurationVariable } from '../models/configurationVariable';


@Controller('api/configuration')
export class ConfigurationController  {

    @Get('variables')
    private getVariables(req: Request, res: Response) {

        ConfigurationVariable.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(configurationVariables => {
            res.status(200).json(configurationVariables);
        }).catch(err => {
            Logger.Err(err.message);
        });
    }

    @Post('variables')
    private postVariables(req: Request, res: Response) {
        let configurationVariable: ConfigurationVariable = new ConfigurationVariable();
    
        console.log(req.body);

        Object.assign(configurationVariable, req.body);
        configurationVariable.save().then(result => {
            res.status(200).json({result: 'ok'});
        }, err => {
            res.status(404).send();
        });
    }
    
    @Put('variables')
    private putVariables(req: Request, res: Response) {

        ConfigurationVariable.findByPk(req.body.id).then(configurationVariable => {

            Object.assign(configurationVariable, req.body);
            configurationVariable.save().then(result => {
                res.status(200).send(configurationVariable);
            })
            .error(err => {
                console.error(err);
                res.status(500).send(err.message);
            })

        })
        .error(err => {
            console.error(err);
            res.status(500).send(err.message);
        });
    }

    @Get()
    private getConfigurations(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        Configuration.findAll().then(configurations => {
            res.status(200).json(configurations);
        }).catch(err => {
            Logger.Err(err.message);
        });
    }

    @Put()
    private putConfiguration(req: Request, res: Response) {
        Logger.Info(req.params);
        const id = req.body.id;
        Configuration.findByPk(id).then(configuration => {
            Object.assign(configuration, req.body);
            return configuration.save();
        })
        .then(result => {
            Logger.Info("Конфигурация обновлена");
            res.status(200).send();
        })
        .catch(err => {
            Logger.Err(err);
        });

        /*
        console.log(req.body);
    const configurationId = req.body.id;
    Configuration.findByPk(configurationId)
        .then(configuration => {
            Object.assign(configuration, req.body);
            return configuration.save();
        })
        .then(result => {
            console.log("Конфигурация обновлена");
            res.status(200).send();
        })
        .catch(err => console.error(err));
        */
    }
}


