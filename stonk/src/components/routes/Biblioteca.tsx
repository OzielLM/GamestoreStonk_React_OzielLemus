import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../AppSidebar';
import TablaJuegos from '../TablaJuegos';
import './scss/Biblioteca.scss'

export default function Biblioteca(){
    const navigate = useNavigate();

    function navegarARegistroJuegos(){
        navigate('/game/registro');
    }
    return (
        <>
            <Row >
                <Col md={{ span: 3}}>
                    <AppSidebar/>
                </Col>
                <Col md={{ span: 9}}>
                    <div className='lista-juegos'>
                        <div className='encabezado'>
                            <h3>Juegos Disponibles</h3>
                            <Button variant='primary' onClick={navegarARegistroJuegos}>Registrar Juego</Button>
                        </div>
                        <TablaJuegos />
                    </div>
                </Col>
            </Row>
            
            
        </>
    );
}