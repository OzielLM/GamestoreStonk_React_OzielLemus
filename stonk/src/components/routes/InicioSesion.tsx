import { Link } from 'react-router-dom';
import { Card, Col, Row, Container } from 'react-bootstrap';
import FormularioInicioSesion from '../FormularioInicioSesion';

export default function InicioSesion() {
    return (
        <>
            <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card bg='dark' text='light' className='card-registro-usuario'>
                        <Card.Header>
                            <h3>Iniciar Sesion</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioInicioSesion />
                        </Card.Body>
                        <Card.Footer>
                        No tienes cuenta? <Link to="/registro">Haz click aqui</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            </Container>
        </>
    );
}