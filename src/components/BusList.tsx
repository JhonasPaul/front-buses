import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

import { Bus, PaginatedResponse } from '../types/Bus';

const BusList: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Usamos el hook useNavigate


    const fetchBuses = async (pageNumber: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/bus/page?page=${pageNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch buses');
            }

            const data: PaginatedResponse = await response.json();
            setBuses(data.content);
            setPage(data.number);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses(page);
    }, [page]);
    // Función para redirigir al detalle del bus
    const handleViewDetails = (id: number) => {
        navigate(`/bus/${id}`);  // Redirige a la página de detalle del bus con el ID
    };

    return (
        <div>
            <h1>Listado de Buses</h1>
            <table className="table table-border table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Número de Bus</th>
                    <th>Placa</th>
                    <th>Fecha de Creación</th>
                    <th>Caracteristica</th>
                    <th>Marca</th>
                    <th>Estado</th>
                    <th>VER</th>
                </tr>
                </thead>
                <tbody>
                {buses.map((bus) => (
                    <tr key={bus.id}>
                        <td>{bus.id}</td>
                        <td>{bus.numeroBus}</td>
                        <td>{bus.placa}</td>
                        <td>{bus.fechaCreacion}</td>
                        <td>{bus.caracteristicas}</td>
                        <td>{bus.marca}</td>
                        <td>{bus.estado}</td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={() => handleViewDetails(bus.id)}
                            >VER
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 0}>Anterior</button>
                    <span> Página {page + 1} de {totalPages} </span>
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Siguiente</button>
                </ul>
            </nav>

        </div>
    );
};

export default BusList;
