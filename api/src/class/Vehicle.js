class Vehicle {
    constructor(plate, category, year_vehicle, color, model, user_id) {
        this.plate = plate;
        this.category = category;
        this.year_vehicle = year_vehicle; 
        this.color= color;
        this.model = model;
        this.user_id= user_id;
    }
}

module.exports = Vehicle;