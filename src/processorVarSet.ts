import { Logger } from '@overnightjs/logger';
import { Configuration } from './models/configuration';
import { Event } from './models/event';
import { Call } from './models/call';
import { Variable } from './models/variable';
import moment = require('moment');
import { isNullOrUndefined } from 'util';
import { ConfigurationVariable } from './models/configurationVariable';

const axios = require('axios')

export class ProcessorVarSet {
    constructor(public configuration: Configuration) { }

    async eventHandle(title: string, value: string, pbxCallId: string) {
        let variable;

        try {
            variable = await Variable.create({
                title: title,
                value: value,
                pbx_call_id: pbxCallId
            });
        } catch(err) {
            console.error(`error var save ${title} ${value} ${pbxCallId}`);
            return;
        }

        const configurationVariable = await ConfigurationVariable.findOne({
            where: {
                title: title
            }
        });
        if (configurationVariable === undefined || configurationVariable === null) {
            return;
        }
        if (isNullOrUndefined(configurationVariable.requestUrl)) {
            return;
        }
        if (configurationVariable.requestUrl.length === 0) {
            return;
        }
        const requestBody = JSON.parse(configurationVariable.requestBody);
        try {
            const response = await axios.post(configurationVariable.requestUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            variable.response = response.data.toString().substring(0, 100);
    
        } catch (err) {
            console.error(`res error: ${err.message}`);
            variable.response = err.message;
        }
        await variable.save();

    }
}