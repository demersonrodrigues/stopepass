const Vehicle = require('../class/Vehicle');
const VehiclesModel = require('../models/VehiclesModel');

class VehiclesService {
  
  static async createVehicle(vehicle) {
    return await VehiclesModel.createVehicle(vehicle);
  }

  static async deleteVehicle(id) {
    await VehiclesModel.deleteVehicle(id);
  }
}

module.exports = VehiclesService;