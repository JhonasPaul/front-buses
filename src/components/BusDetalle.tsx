import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Bus} from '../types/Bus';
import {useNavigate} from 'react-router-dom';

const BusDetalle: React.FC = () => {
    const {id} = useParams(); //obtenemos el id de la URL
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); //usamos el hook useNavigate

    const username = 'user';
    const password = 'password';
    const authHeader = 'Basic ' + btoa(username + ':' + password);  //codificación Base64 para autenticación básica

    useEffect(() => {
        const fetchBusDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/bus/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authHeader,  // Agregamos el encabezado de autenticación
                    },
                });
                if (!response.ok) {
                    throw new Error('Error en el detalle del bus');
                }

                const data = await response.json();
                setBus(data);  // Guardamos los detalles del bus en el estado
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBusDetail();
        }
    }, [id]);  // reactiva cada vez que cambia el id

    if (loading) return <div className={"text-center"}>Cargando...</div>;
    if (error) return <div className={"text-center"}> {error}</div>;

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
                            <div>
                                <button className="btn btn-primary"
                                        onClick={() => verLista()}
                                > Volver
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusDetalle;
