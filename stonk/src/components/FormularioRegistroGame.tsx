import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Juego from '../models/Juego';
import RegistrarGameTask from '../tasks/RegistrarGameTask';

export default function FormularioRegistroGame(){
    const [nombre, setNombre] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [año, setAño] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    function handleNombreChange(event: ChangeEvent<HTMLInputElement>){
        const valorNombre = event.target.value;
        setNombre(valorNombre);
    }

    function handleEmpresaChange(event: ChangeEvent<HTMLInputElement>){
        const valorEmpresa = event.target.value;
        setEmpresa(valorEmpresa);
    }

    function handlePlataformaChange(event: ChangeEvent<HTMLInputElement>){
        const valorPlataforma = event.target.value;
        setPlataforma(valorPlataforma);
    }

    function handleAñoChange(event: ChangeEvent<HTMLInputElement>){
        const valorAño = event.target.value;
        setAño(parseInt(valorAño));
    }

    function handleCantidadChange(event: ChangeEvent<HTMLInputElement>){
        const valorCantidad = event.target.value;
        setCantidad(parseInt(valorCantidad));
    }

    function handlePrecioChange(event: ChangeEvent<HTMLInputElement>){
        const valorPrecio = event.target.value;
        setPrecio(parseFloat(valorPrecio));
    }

    async function handleFormSubmit(event: FormEvent){
        event.preventDefault();
        try{
            const juegoARegistrar = new Juego(
                undefined,
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            );

            const registrarGameTask = new RegistrarGameTask(juegoARegistrar);

            await registrarGameTask.execute();
            navigate('/game/biblioteca');
        }catch(e){
            switch((e as Error).message){
                case'ErrorSesionExpiradaOInvalida': 
                    localStorage.removeItem('tokenSesion');
                    navigate('/login');
                break;

                case'ErrorFormularioIncompleto': window.alert('Olvidaste completar todos los campos del formulario');
                break;

                case'ErrorNombreDuplicado': window.alert('Ya existe un juego con el mismo nombre');
                break;

                default: window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    return(
        <>
            <Form onSubmit={ handleFormSubmit }>
                <Form.Group>
                    <Form.Label htmlFor='txtNombre'>Nombre:</Form.Label>
                    <Form.Control id='txtNombre' type='text' name='nombre' value={nombre} onChange={ handleNombreChange }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='txtEmpresa'>Empresa:</Form.Label>
                    <Form.Control id='txtEmpresa' type='text' name='empresa' value={empresa} onChange={ handleEmpresaChange }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='txtPlataforma'>Plataforma:</Form.Label>
                    <Form.Control id='txtPlataforma' type='text' name='plataforma' value={plataforma} onChange={ handlePlataformaChange }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='txtAño'>Año:</Form.Label>
                    <Form.Control id='txtAño' type='number' name='año' value={año} onChange={ handleAñoChange }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='txtCantidad'>Cantidad:</Form.Label>
                    <Form.Control id='txtCantidad' type='number' name='cantidad' value={cantidad} onChange={ handleCantidadChange }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='txtPrecio'>Precio:</Form.Label>
                    <Form.Control id='txtPrecio' type='number' name='precio' value={precio} onChange={ handlePrecioChange }/>
                </Form.Group>

                <Button type='submit' className='registrar-game-button' >Registrar</Button>
            </Form>
        </>
    )
}