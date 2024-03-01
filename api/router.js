// router.js
const fastifyPlugin = require('fastify-plugin');
const connection = require('./src/models/connection');

console.log(connection);

async function routes(fastify, options) {

  const conn = await connection;

  fastify.route({
    method: 'GET',
    url: '/',
    handler: async (request, reply) => {
      return true;
    }
  });

  // Rotas para usuários
  fastify.route({
    method: 'GET',
    url: '/users',
    handler: async () => {
    
      try {
        const [results] = await conn.query(
          'SELECT * FROM `users`'
        );
        
        // console.log(results);
        return results;
      } catch (err) {
        console.log(err);
      }
    }
  });
  
  fastify.route({
    method: 'GET',
    url: '/users/:id',
    handler: async (request) => {
      try {
        const userId = request.params.id;
        const [results] = await conn.query(
          `SELECT * FROM users WHERE id_user = ${userId}`
        );
        
        // console.log(results);
        return results;
      } catch (err) {
        console.log(err);
      }
    }
});


  fastify.route({
    method: 'POST',
    url: '/users',
    handler: async (request, reply) => {
      
    }
  });

  // Rotas para veículos
  fastify.route({
    method: 'GET',
    url: '/vehicles',
    handler: async (request, reply) => {
    
    }
  });

  fastify.route({
    method: 'POST',
    url: '/vehicles',
    handler: async (request, reply) => {
      
    }
  });
}

module.exports = fastifyPlugin(routes);