// router.js
const fastifyPlugin = require('fastify-plugin');

async function routes(fastify, options) {
  // Rotas para usuários
  fastify.route({
    method: 'GET',
    url: '/users',
    handler: async (request, reply) => {
      // Implemente a lógica para listar usuários
    }
  });

  fastify.route({
    method: 'POST',
    url: '/users',
    handler: async (request, reply) => {
      // Implemente a lógica para criar um usuário
    }
  });

  // Rotas para veículos
  fastify.route({
    method: 'GET',
    url: '/vehicles',
    handler: async (request, reply) => {
      // Implemente a lógica para listar veículos
    }
  });

  fastify.route({
    method: 'POST',
    url: '/vehicles',
    handler: async (request, reply) => {
      // Implemente a lógica para criar um veículo
    }
  });
}

module.exports = fastifyPlugin(routes);