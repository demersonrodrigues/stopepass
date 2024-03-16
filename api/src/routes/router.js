// router.js
// const fastifyPlugin = require('fastify-plugin');
const connection = require('../Connection');
const User = require('../class/user');
const UsersModel = require('../models/UsersModel');

// console.log(connection);

// async function routes(fastify) {
//   fastify.get('/users', userController.getUsers);
//   fastify.get('/users/:id', userController.getUser);
//   fastify.post('/users', userController.createUser);
//   fastify.put('/users/:id', userController.updateUser);
//   fastify.delete('/users/:id', userController.deleteUser);
// }


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
      console.log('Conectou');
      try {
        const [results] = await conn.query(
          'SELECT * FROM `users`'
        );
        console.log(results);
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
          `SELECT * FROM users WHERE id = ${userId}`
        );
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
      try {
        const { name, date_born, cpf, email, tel, user_type } = request.body;
        let user = new User(name, date_born, cpf, email, tel, user_type);
        const newUser = await UsersModel.createUser(user);
        reply.send(newUser);
        return newUser;
      } catch (error) {
        console.log(error);
      }
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    handler: async (request, reply) => {
      try {
        const id = request.params.id;
        const { name, date_born, cpf, email, tel, user_type } = request.body;
        let user = new User(name, date_born, cpf, email, tel, user_type);
        const updateUser = UsersModel.updateUser(user, id);
        reply.send(updateUser);
        return updateUser;
      } catch (error) {
        console.log(error);
      }
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    handler: async (request, reply) => {
      try {
        const id = request.params.id;
        const deleteUser = UsersModel.deleteUser(id);
        reply.send(deleteUser);
        return deleteUser;
      } catch (error) {
        console.log(error);
      }
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

module.exports = routes;