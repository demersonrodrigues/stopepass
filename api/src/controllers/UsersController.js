const UsersService = require('../services/UsersService')

exports.getUsers = async (reply) => {
    const users = await UsersService.getUsers();
    reply.send(users);
}

exports.getUser = async (request, reply) => {
    const user = await UsersService.getUser(request.params.id);
    reply.send(user);
  };
  
exports.createUser = async (request, reply) => {
  const user = await UsersService.createUser(request.body);
  reply.send(user);
};

exports.updateUser = async (request, reply) => {
  await UsersService.updateUser(request.params.id, request.body);
  reply.send({ message: 'Usuário atualizado!' });
};

exports.deleteUser = async (request, reply) => {
  await UsersService.deleteUser(request.params.id);
  reply.send({ message: 'Usuário deletado com sucesso!' });
};
  