const connection = require('./Connection');

class VehiclesModel {

    static async createVehicle(vehicle) {

        const {plate, category, year_vehicle, color, model, user_id} = vehicle;
        
        const userExists = await this.existsUser(user_id);
        if (!userExists) {
            throw new Error('Usuário não encontrado!');
        }

        const vehicleExists = await this.existsVehicle('plate', plate);
        if (vehicleExists) {
            throw new Error('Já existe um veículo cadastrado com esta placa!');
        }

        const {result } = await (await connection).query(`
            INSERT INTO vehicles (plate, category, year_vehicle, color, model, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [plate, category, year_vehicle, color, model, user_id]);

        console.log('algo aqui', result);
        return {id: result.insertId};
        
    }

    static async deleteVehicle (id) {
        const [existingVehicle] = await (await connection).query(`
        SELECT * FROM vehicles WHERE id = ?
        `, [id]);

        if (existingVehicle.length === 0) {
            throw new Error('Veículo não encontrado!');
        }

        await (await connection).query(`DELETE FROM vehicles WHERE id = ?`, [id]);
    }

    static async existsVehicle(field, value) {
        const existVehicle = (await connection).query(`
        SELECT * FROM vehicles WHERE ${field} = ?`, 
        [value]);
        return existVehicle.length > 0;
    }

    static async existsUser(user_id) {
        const [existingUser] = await (await connection).query(`
          SELECT * FROM users WHERE id = ?
    `, [user_id]);
        return existingUser.length > 0;
    }

}

module.exports = VehiclesModel;