const VehiclesService = require('../services/VehiclesService')

exports.createVehicle = async (request, reply) => {
  const vehicle = await VehiclesService.createVehicle(request.body);
  reply.send(vehicle);
};

exports.deleteVehicle = async (request, reply) => {
  await VehiclesService.deleteVehicle(request.params.id);
  reply.send({ message: 'Veículo deletado com sucesso!' });
};
