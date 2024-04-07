import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table} from 'react-bootstrap';
import Juego from '../models/Juego';
import JuegoService from '../services/JuegoService';
import RenglonTablaJuegos from './RenglonTablaJuegos';

export default function TablaJuegos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const navigate = useNavigate();

    async function cargarJuego() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                navigate('/inicioSesion');
                return;
            }

            const servicioJuegos = new JuegoService(tokenSesion);
            const listaJuegos = await servicioJuegos.obtenerListaJuego();

            setJuegos(listaJuegos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarJuego();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    return (
        <>
            <div className='backgroundPaginaPrincipal'>
                <Table variant='light' bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Plataforma</th>
                            <th>Año</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            juegos.map(juego => (
                                <RenglonTablaJuegos
                                    key={juego.id}
                                    juego={juego}
                                />
                            ))
                        }
                    </tbody>
                </Table>
            </div>   
        </>
    );
}
