const connection = require('./Connection');
 
class UsersModel {

    static async getUsers() {
        const [data] = (await connection).query(
            `SELECT * FROM users`);
        return data; 
    }

    static async getUser(id) {
        const [data] = (await connection).query(
            `SELECT * FROM users
             WHERE id = ?   
            `, [id]);
        console.log(data);
        return data[0];
    }

    static async createUser(user) { 
        
        const {name, date_born, cpf, email, tel, user_type, vehicle} = user;

        if (await this.userExists('cpf', cpf)) {
            throw new Error('Já existe um usuário com este CPF. Insira outro CPF');
        }

        if (await this.userExists('email', email)) {
            throw new Error('Já existe um usuário com este Email. Insira outro Email');
        }

        if (await this.userExists('tel', tel)) {
            throw new Error('Já existe um usuário com este Número de telefone. Insira outro número');
        }

        const [result] = await(await connection).query(`
            INSERT INTO users (name, date_born, cpf, email, tel, user_type)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [name, date_born, cpf, email, tel, user_type]);

        (await connection).query(`
            INSERT INTO vehicles (plate, category, year_vehicle, color, model, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [vehicle.plate, vehicle.category, vehicle.year_vehicle, vehicle.color, vehicle.model, result.insertId]);

        return {id: result.insertId};
    }

    static async updateUser (id, user) {

        const { email, tel, user_type } = user;

        if (await this.userExists('email', email)) {
            throw new Error('Já existe um usuário com este Email. Insira outro Email');
        }
        
        if (await this.userExists('tel', tel)) {
            throw new Error('Já existe um usuário com este Número de telefone. Insira outro número');
        }

        (await connection).query(`UPDATE users SET email = ?, tel = ?, user_type = ? WHERE id = ?`, [email, tel, user_type, id]);
    }

    static async deleteUser(id) {
        try 
        {
            const user = (await connection).query('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length === 0) {
                throw new Error('Usuário não encontrado');
            }
            const vehicle = ('SELECT * FROM vehicles WHERE user_id = ?', [id]);
            if (vehicle.length > 0) {
                (await connection).query('DELETE FROM vehicles WHERE user_id = ?', [id]);
            }

            (await connection).query('DELETE FROM users WHERE id = ?', [id]);
        } 
        catch (error) 
        {
            console.error(error);
            console.log('ENTROU NO CATCH PÓS ERROR');
            throw new Error('Não foi possível deletar o usuário');
        }
    }

    // Validações
    static async userExists(field, value) {
        const existingUser = (await connection).query(`
          SELECT * FROM users WHERE ${field} = ?
        `, [value]);
        return existingUser.length > 0;
      }
}

module.exports = UsersModel;