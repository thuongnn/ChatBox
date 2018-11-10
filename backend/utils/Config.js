const ENV = require('../config/env');
const Config = ENV[ENV.env];

module.exports = Config;