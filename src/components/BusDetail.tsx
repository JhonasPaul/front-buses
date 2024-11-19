import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bus } from '../types/Bus';

const BusDetail: React.FC = () => {
    const { id } = useParams(); // Obtenemos el id de la URL
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            <h1>Detalles del Bus</h1>
            {bus && (
                <div>
                    <p>ID: {bus.id}</p>
                    <p>Número de Bus: {bus.numeroBus}</p>
                    <p>Placa: {bus.placa}</p>
                    <p>Fecha de Creación: {bus.fechaCreacion}</p>
                    <p>Marca: {bus.marca}</p>
                    <p>Estado: {bus.estado}</p>
                    <p>Característica: {bus.caracteristicas}</p>
                </div>
            )}
        </div>
    );
};

export default BusDetail;
