import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Bus, PaginatedResponse} from '../types/Bus';
import '../estilos/estilos.css'

const BusLista: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const username = 'user';
    const password = 'password';
    const authHeader = 'Basic ' + btoa(username + ':' + password); // codificación Base64

    const fetchBuses = async (pageNumber: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/bus/page?page=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader, // encabezado de autenticación
                },
            });

            if (!response.ok) {
                throw new Error('Error en la busqueda de buses');
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

    if (loading) return <div className={"text-center"}>Cargando...</div>;
    if (error) return <div className={"text-center"}>{error}</div>;

    const verDetalle = (id: number) => {
        navigate(`/bus/${id}`);
    };

    return (
        <div className="mt-5 rounded shadow">
            <h1>Listado de Buses</h1>
            <table className="table table-border table-striped">
                <thead>
                <tr className={"tr"}>
                    <th>ID</th>
                    <th>Número de Bus</th>
                    <th>Placa</th>
                    <th>Fecha de Creación</th>
                    <th>Caracteristica</th>
                    <th>Estado</th>
                    <th>Marca</th>
                    <th>VER</th>
                </tr>
                </thead>
                <tbody>
                {buses.map((bus) => (
                    <tr className="td" key={bus.id}>
                        <td>{bus.id}</td>
                        <td>{bus.numeroBus}</td>
                        <td>{bus.fechaCreacion}</td>
                        <td>{bus.caracteristicas}</td>
                        <td>{bus.placa}</td>
                        <td>{bus.estado}</td>
                        <td>{bus.marca.marca}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => verDetalle(bus.id)}>
                                VER
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pb-1" aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                        >
                            Anterior
                        </button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">
                            Página {page + 1} de {totalPages}
                        </span>
                    </li>
                    <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages - 1}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BusLista;
