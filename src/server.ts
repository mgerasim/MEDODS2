import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as express from 'express';
import * as morgan from 'morgan';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Sequelize } from 'sequelize-typescript';
import { Configuration } from './models/configuration'
import { Event } from './models/event'
import { Processor } from './processor';
import { Call } from './models/call';
import { Variable } from './models/variable';
const AmiClient = require('asterisk-ami-client');
const sequelize = require('./databaseProvider')
import * as moment from 'moment';

const Queue = require('queue-fifo');
const InfiniteLoop = require('infinite-loop');
const asyncWhile = require("async-while");

import * as schedule from 'node-schedule';
import { ConfigurationVariable } from './models/configurationVariable';
import { Callback } from './models/callback';
import { Replacement } from './models/replacement';

import {JwtTokenService} from './jwt_token_service'

class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    private processor: Processor

    private queue = new Queue();

    private readBufferTask = new InfiniteLoop();

    private asyncWhile = new asyncWhile();

    private amiClient: any;

    private _isReconnected = false;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupStatic();
        this.setupControllers();
        this.setupDatabaseProvider(); 2
        this.setupAmiClient();
        this.setupSchedule();
        this.setupQueue();
        this.setupCallback();
    }

    private setupCallback() {
        this.app.use('/callback', (req, res) => {
            console.log(req.query);
            const callback = new Callback();
            callback.to = req.query.to;
            callback.from = req.query.from;
            callback.save().then(result => {

                Configuration.findAll().then(configurations => {
                    const configuration = configurations[0];
                    this.amiClient.action({
                        Action: 'Originate',
                        Channel: callback.from,
                        Callerid: callback.id,
                        Timeout: configuration.callbackTimeout * 10000,
                        Context: configuration.callbackContext,
                        Exten: callback.to,
                        Priority: 1,
                        Async: 'yes'
                    });
                    res.status(200).send();
                })
                    .error(err => {
                        console.error(err);
                        res.status(500).send(err.message);
                    });

            }, err => {
                console.error(err);
                res.status(500).send(err.message);
            })
        });
    }

    private runEventHandle() {
        setTimeout(async () => {
            if (!this.queue.isEmpty()) {
                const event = this.queue.dequeue();
                await this.processor.eventHandle(event);
            }
            this.runEventHandle();
        }, 1);
    }

    private setupQueue() {

        this.runEventHandle();


        /*
        setImmediate(async () => {
            console.log('start')
            if (!this.queue.isEmpty()) {
                const event = this.queue.dequeue();
                await this.processor.eventHandle(event);
            }
        }, 100);
*/

        /*
        this.readBufferTask.add(async () => {

            console.log('start');
            if (!this.queue.isEmpty()) {
                const event = this.queue.dequeue();
                await this.processor.eventHandle(event);
            }

            console.log('stop');
        });
        this.readBufferTask.run();
        */
    }

    private setupSchedule() {
        const { Op } = require('sequelize')

        var j = schedule.scheduleJob('2 * * * *', function () {
            console.log('delete');
            console.log(moment().subtract(1, 'hours').toDate());

            Event.destroy({
                where: {
                    createdAt: {
                        [Op.lte]: moment().subtract(1, 'hours').toDate()
                    }
                }
            });
        });
    }

    private setupStatic() {
        this.app.use('/', express.static('public'));
        this.app.use('/events', express.static('public'));
        this.app.use('/service', express.static('public'));
        this.app.use('/calls', express.static('public'));
        this.app.use('/calls/*', express.static('public'));
        this.app.use('/callbacks', express.static('public'));
        this.app.use('/replacement', express.static('public'));
        this.app.use('/configurationVariables', express.static('public'));
        this.app.use('/configuration', express.static('public'));
        this.app.use('/exceptions', express.static('public'));
    }

    private reconnectAmiClient(configuration: Configuration) {
        this.amiClient.connect(configuration.AMI_username,
            configuration.AMI_password,
            {
                host: configuration.AMI_server,
                port: configuration.AMI_port
            })
            .then(() => {
                console.log(`???????????????? ?????????????????????????? : ${configuration.AMI_server}`);

                /*
                JwtTokenService.Instance.getToken()
                    .then((token) => console.log(token))
                    .catch((error) => console.error(error));
                  */  

                this.processor = new Processor(configuration, this.amiClient);
                this.amiClient
                    .on('Dial', event => {
                        this.queue.enqueue(event);
                    })
                    .on('VarSet', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Hangup', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Hold', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Bridge', event => {
                        this.queue.enqueue(event);
                    })
                    .on('BridgeLeave', event => {
                        this.queue.enqueue(event);
                    })
                    .on('ExtensionStatus', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Newstate', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Newchannel', event => {
                        this.queue.enqueue(event);
                    })
                    .on('NewCallerid', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Cdr', event => {
                        this.queue.enqueue(event);
                    })
                    .on('QueueMemberStatus', event => {
                        this.queue.enqueue(event);
                    })
                    .on('HangupRequest', event => {
                        this.queue.enqueue(event);
                    })
                    .on('SoftHangupRequest', event => {
                        this.queue.enqueue(event);
                    })
                    .on('Newexten', event => {
                        this.queue.enqueue(event);
                    })
                    .on('AgentComplete', event => {
                        this.queue.enqueue(event);
                    })
                    .on('LINKEDID_END', event => console.log(event))
                    .on('resp_123', response => {

                        // client.disconnect();
                    })
                    .on('connect', () => {
                        console.log('connect');
                        this._isReconnected = false;
                    })
                    .on('disconnect', () => {
                        console.log('disconnect');
                        this._isReconnected = true;
                        setTimeout(() => this.reconnectAmiClient(configuration), 10000);
                    })
                    .on('reconnection', () => {
                        this._isReconnected = true;
                    })
                    .on('internalError', error => {
                        console.log('internalError');
                        Logger.Err(error);
                        if (this._isReconnected) {
                            setTimeout(() => this.reconnectAmiClient(configuration), 10000);
                        }
                    });
                this.amiClient.action({
                    Action: 'Ping',
                    ActionID: 123
                });
            })
            .catch(error => {
                console.log('connect ami client error');
                Logger.Err(configuration.AMI_server);
                Logger.Err(configuration.AMI_username);
                Logger.Err(configuration.AMI_password);
                Logger.Err(error);

                if (this._isReconnected) {
                    setTimeout(() => this.reconnectAmiClient(configuration), 10000);

                }
            });
    }

    private setupAmiClient() {

        this.amiClient = new AmiClient({
            reconnect: false,
            keepAlive: true,
            emitEventsByTypes: true,
            emitResponsesById: true
        });
        Configuration.findAll().then(configurations => {
            const configuration = configurations[0];
            this.reconnectAmiClient(configuration);
        })
            .catch(err => {
                Logger.Err(err);
            })
    }

    private setupDatabaseProvider() {

        // const sequelize = new Sequelize('mysql://root:nFsBcwTm7iQgE4X10s85@127.0.0.1/Operware_development');


        sequelize.addModels([
            Configuration,
            Call,
            Variable,
            Event,
            ConfigurationVariable,
            Callback,
            Replacement
        ]);
        sequelize.sync();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.use(morgan('dev'));

        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ExampleServer;