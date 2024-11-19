export interface Bus {
    id: number;
    estado: string;
    fechaCreacion: string;
    caracteristicas: string;
    numeroBus: string;
    placa:string
    marca: string;
}

export interface PaginatedResponse {
    content: Bus[];
    number: number;
    totalPages: number;
}
