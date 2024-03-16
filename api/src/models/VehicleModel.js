const connection = require('./Connection');

class VehiclesModel {

    //Listagem geral dos veículos
    static async getVehicles() {
        const [vehicles] = (await connection).query(`SELECT * FROM vehicles`);
        return vehicles;
    }

    //Listagem por unidade de veículo
    static async getVehicle(id) { 
        const [vehicle] = (await connection).query(`SELECT * FROM vehicles WHERE id= ? `, [id]);
        return vehicle[0];
    }

    //criando um veículo
    static async createVehicle(vehicle) {
        const {plate, category, year_vehicle, color, model} = vehicle;
        const [result] = (await connection).query(
            `INSERT INTO vehicles (plate, category, year_vehicle, color, model) 
            VALUES (?, ?, ?, ?, ?)`,
            [plate, category, year_vehicle, color, model]);
        return {id: result.insertId};
    }

    //Atualizações de veículos
    static async updateVehicle(id, vehicle) {
        const {plate, category, year_vehicle, color, model} = vehicle;
        (await connection).query(
            `UPDATE vehicles SET plate = ?, category = ?, year_vehicle = ?, color = ?, model = ?
            WHERE id = ?`,
            [plate, category, year_vehicle, color, model, id]);
    }

    static async deleteVehicle (id) {
        (await connection).query(`DELETE * FROM vehicles WHERE id = ?`, [id]);
    }
}