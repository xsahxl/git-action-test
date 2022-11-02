
const Engine = require('logger');


const app1 = { a: 'cc', b: 'bb' };

const log = new Engine({
  level: 'debug',
  secret: Object.values(app1),
});

log.info(JSON.stringify({ a: 'cc', b: 'bb', c: 'ssss' }));
