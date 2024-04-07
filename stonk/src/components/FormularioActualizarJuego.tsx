import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Juego from '../models/Juego';
import { useParams, useNavigate } from "react-router-dom";
import ActualizarJuegoTask from '../tasks/ActualizarJuegoTask';
import JuegoService from '../services/JuegoService';

interface FormularioActualizarJuegoProps {
    juego: Juego;
}

export default function FormularioActualizarJuego(
    { juego }: FormularioActualizarJuegoProps
) {

    const [nombre, setNombre] = useState(juego.nombre);
    const [empresa, setEmpresa] = useState(juego.empresa);
    const [plataforma, setPlataforma] = useState(juego.plataforma);
    const [año, setAño] = useState(juego.año);
    const [cantidad, setCantidad] = useState(juego.cantidad);
    const [precio, setPrecio] = useState(juego.precio);
    const navigate = useNavigate();
    const { idJuego } = useParams();

    const borrar = () => {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');
            if(!tokenSesion){
                throw new Error('ErrorSesionExpiradaOInvalida');
            }

            const id = parseInt(idJuego as string);

            if(isNaN(id)){
                navigate('/game/biblioteca')
                return;
            }
    
            const servicioJuegos = new JuegoService(tokenSesion);
            servicioJuegos.eliminarJuego(juego);
            navigate('/game/biblioteca');
        } catch (e) {
            if(e instanceof Error){
                switch(e.message){
                    case 'ErrorSesionExpiradaOInvalida':
                        localStorage.removeItem('tokenSesion');
                        navigate('/login');
                        return;
                    case 'ErrorJuegoNoEncontrado':
                        window.alert('Auto no encontrado');
                        navigate('/game/biblioteca');
                        return;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        navigate('/autos');
                        return;
                }
            }
        }
    }

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombre':
                setNombre(valor);
                break;
            case 'empresa':
                setEmpresa(valor);
                break;
            case 'plataforma':
                setPlataforma(valor);
                break;
            case 'año':
                setAño(parseInt(valor));
                break;
            case 'cantidad':
                setCantidad(parseInt(valor));
                break;    
            case 'precio':
                setPrecio(parseFloat(valor));
        }
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        try{

            const id = parseInt(idJuego as string);

            if(isNaN(id)){
                navigate('/game/biblioteca')
                return;
            }

            const juegoPorActualizar = juego
            juegoPorActualizar.nombre = nombre
            juegoPorActualizar.empresa = empresa
            juegoPorActualizar.plataforma = plataforma
            juegoPorActualizar.año = año
            juegoPorActualizar.cantidad = cantidad
            juegoPorActualizar.precio = precio
            
            const actualizarJuegoTask = new ActualizarJuegoTask(
                juegoPorActualizar
            );

            await actualizarJuegoTask.execute();
            window.alert('Su juego se ha actualizado')
            navigate(`/game/${juego.id}`);
        }catch(e){
            switch((e as Error).message){
                case'ErrorSesionExpiradaOInvalida': 
                    localStorage.removeItem('tokenSesion');
                    navigate('/inicioSesion');
                break;

                case'ErrorFormularioIncompleto': 
                    window.alert('Olvidaste completar todos los campos del formulario');
                break;

                case'ErrorNombreDuplicado': 
                    window.alert('Ya existe un juego con el mismo nombre');
                break;

                case 'ErrorJuegoNoEncontrado':
                    break;

                default: window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="txtNombre">
                        Nombre
                    </Form.Label>
                    <Form.Control
                        id="txtNombre"
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtEmpresa">
                        Empresa
                    </Form.Label>
                    <Form.Control
                        id="txtEmpresa"
                        type="text"
                        name="empresa"
                        value={empresa}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtPlataforma">
                        Plataforma
                    </Form.Label>
                    <Form.Control
                        id="txtPlataforma"
                        type="text"
                        name="plataforma"
                        value={plataforma}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtAño">
                        Año
                    </Form.Label>
                    <Form.Control
                        id="txtAño"
                        type="number"
                        name="año"
                        value={año}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtCantidad">
                        Cantidad
                    </Form.Label>
                    <Form.Control
                        id="txtCantidad"
                        type="number"
                        name="cantidad"
                        value={cantidad}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtPrecio">
                        Precio
                    </Form.Label>
                    <Form.Control
                        id="txtPrecio"
                        type="number"
                        name="precio"
                        value={precio}
                        onChange={handleFormControlChange}
                    />
                </Form.Group>
                <Button className="boton" type="submit" variant="primary">
                    Actualizar
                </Button>
                <Button className="boton" variant="danger" onClick={handleShow}>Eliminar</Button>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Usted Va a Eliminar este Juego</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Seguro que desea eliminarlo?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={borrar}>
                            Si
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    );
}