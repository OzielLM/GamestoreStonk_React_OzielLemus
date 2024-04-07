import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Juego from '../../models/Juego';
import JuegoService from '../../services/JuegoService';
import FormularioActualizarJuego from '../FormularioActualizarJuego';
import { Link } from 'react-router-dom';
import './scss/DetalleJuego.scss'

export default function DetalleJuego() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [juego, setJuego] = useState<Juego | undefined>(undefined);
    const navigate = useNavigate();
    const { idJuego } = useParams();

    async function loadJuego() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                throw new Error('ErrorSesionExpiradaOInvalida');
            }

            const id = parseInt(idJuego as string);

            if (isNaN(id)) {
                navigate('/game/biblioteca');
                return;
            }

            const servicioAutos = new JuegoService(tokenSesion);
            const autoEncontrado = await servicioAutos.obtenerPorID(id);

            setJuego(autoEncontrado);
        } catch (e) {
            if (e instanceof Error) {
                switch (e.message) {
                    case 'ErrorSesionExpiradaOInvalida':
                        navigate('/login');
                        return;
                    case 'ErrorAutoNoEncontrado':
                        break;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        navigate('/game/biblioteca');
                        return;
                }
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadJuego();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    if (!juego) {
        return <h3>Error 404: Juego no encontrado.</h3>;
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3 className='texto'>{juego.nombre}</h3>
                    <Button variant='outline-primary' href="/game/biblioteca">&lt; Regresar</Button>
                    <Card bg='dark' text='light' className='card-actualizar'>
                        <Card.Body>
                            <FormularioActualizarJuego juego={juego} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
