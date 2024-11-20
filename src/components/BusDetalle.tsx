import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Bus} from '../types/Bus';
import {useNavigate} from 'react-router-dom'; // Importamos useNavigate


const BusDetalle: React.FC = () => {
    const {id} = useParams(); // Obtenemos el id de la URL
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Usamos el hook useNavigate


    useEffect(() => {
        const fetchBusDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/bus/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bus details');
                }

                const data = await response.json();
                setBus(data);  // Guardamos los detalles del bus en el estado
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };


        fetchBusDetail();
    }, [id]);  // Reactiva cada vez que cambia el id

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    const verLista = () => {
        navigate(`/`);
    };
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="row">
                <div className="col-sm">
                    {bus && (
                        <div className="border p-4 rounded shadow">
                            <h1 className="mb-4">Detalles del Bus</h1>

                            <p><strong>ID:</strong> {bus.id}</p>
                            <p><strong>Número de Bus:</strong> {bus.numeroBus}</p>
                            <p><strong>Placa:</strong> {bus.placa}</p>
                            <p><strong>Fecha de Creación:</strong> {bus.fechaCreacion}</p>
                            <p><strong>Estado:</strong> {bus.estado}</p>
                            <p><strong>Característica:</strong> {bus.caracteristicas}</p>
                            <p><strong>Marca:</strong> {bus.marca.marca}</p>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={() => verLista()}
                                > Volver
                                </button>
                            </td>
                        </div>

                    )}
                </div>
            </div>
        </div>


    );
};

export default BusDetalle;
