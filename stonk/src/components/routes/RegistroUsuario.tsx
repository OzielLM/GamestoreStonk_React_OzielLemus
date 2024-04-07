import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import FormularioRegistro from '../FormularioRegistro';
import './scss/RegistroUsuario.scss'

export default function RegistroUsuario() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card bg='dark' text='light' className='card-registro-usuario'>
                        <Card.Header>
                            <h3>Crear cuenta</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioRegistro />
                        </Card.Body>
                        <Card.Footer>
                            Ya tienes cuenta? <Link to="/login">Haz click aqui</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
