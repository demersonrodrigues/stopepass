import { Vehicle } from "./Vehicle";

export interface User {

    name: string,
    dateBorn: string,
    cpf: string,
    email: string,
    tel: string,
    userType: string,
    vehicle: Vehicle,

}