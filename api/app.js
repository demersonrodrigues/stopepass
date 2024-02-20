const fastify = require('fastify')({ logger:true });
const routes = require('./router');

fastify.register(routes);

fastify.listen(3000, (err, adress) => {
    if (err) throw err ;
    fastify.log.info(`server listening on ${adress}`);    
    
})