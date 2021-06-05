

'use strict';

//const fs = require('fs');
import * as fs from 'fs';
// const path = require('path');
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];


var sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


module.exports = sequelize;
