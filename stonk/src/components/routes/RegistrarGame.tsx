import { Row, Col, Card, Button } from "react-bootstrap"
import FormularioRegistroGame from "../FormularioRegistroGame"
import './scss/RegistrarGame.scss'

export default function RegistrarGame(){
    return(
        <>
            <Row>
                <Col className="registrar-game" md={{ span: 6, offset: 3 }}>
                    <h4 className="registrar-game-texto">Registrar Juego</h4>
                    <Button className="registrar-game-regresar" variant='outline-danger' href="/game/biblioteca">Regresar</Button>
                    <Card bg='dark' text='light'>
                        <Card.Body>
                            <FormularioRegistroGame/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}