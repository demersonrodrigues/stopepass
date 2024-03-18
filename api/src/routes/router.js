const connection = require('../models/Connection');
const User = require('../class/User');
const UsersModel = require('../models/UsersModel');
const Vehicle = require('../class/Vehicle');
const VehiclesModel = require('../models/VehiclesModel');

async function routes(fastify, options) {

  const conn = await connection;

  fastify.route({
    method: 'GET',
    url: '/',
    handler: async () => {
      return true;
    }
  });

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
        const { name, date_born, cpf, email, tel, user_type, vehicle } = request.body;
        let user = new User(name, date_born, cpf, email, tel, user_type, vehicle);
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
        const updateUser = await UsersModel.updateUser(id, user);
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
    method: 'POST',
    url: '/vehicle',
    handler: async (request, reply) => {
      try {
        const { plate, category, year_vehicle, color, model, user_id } = request.body;
        let vehicle = new Vehicle( plate, category, year_vehicle, color, model, user_id);
        const newVehicle = await VehiclesModel.createVehicle(vehicle);
        reply.send(newVehicle);
        return newVehicle;
      } catch (error) {
        console.log(error);
      }
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/vehicle/:id',
    handler: async (request, reply) => {
      try {
        const id = request.params.id;
        const delVehicle = VehiclesModel.deleteVehicle(id);
        reply.send(delVehicle);
        return delVehicle;
      } catch (error) {
        console.log(error);
      }
    }
  });
}

module.exports = routes;