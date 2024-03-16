const UserService = require('../services/UserService')

exports.getUsers = async (reply) => {
    const users = await UserService.getUsers();
    reply.send(users);
}

exports.getUser = async (request, reply) => {
    const user = await UserService.getUser(request.params.id);
    reply.send(user);
  };
  
exports.createUser = async (request, reply) => {
  const user = await UserService.createUser(request.body);
  reply.send(user);
};

exports.updateUser = async (request, reply) => {
  await UserService.updateUser(request.params.id, request.body);
  reply.send({ message: 'User updated successfully' });
};

exports.deleteUser = async (request, reply) => {
  await UserService.deleteUser(request.params.id);
  reply.send({ message: 'User deleted successfully' });
};
  