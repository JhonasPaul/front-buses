import {Marca} from "./Marca";

export interface Bus {
    id: number;
    estado: string;
    fechaCreacion: string;
    caracteristicas: string;
    numeroBus: string;
    placa: string
    marca: Marca;
}

export interface PaginatedResponse {
    content: Bus[];
    number: number;
    totalPages: number;
}
