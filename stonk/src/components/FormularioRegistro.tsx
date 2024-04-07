import { ChangeEvent, useState, FormEvent } from "react";
import RegistrarUsuarioTask from "../tasks/RegistrarUsuarioTask";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FormularioRegistro(){
    const [ nombre, setNombre ] = useState('');
    const [ apellidoPaterno, setAppellidoPaterno ] = useState('');
    const [ apellidoMaterno, setAppellidoMaterno ] = useState('');
    const [ correo, setCorreo ] = useState('');
    const [ nombreUsuario, setNombreUsuario ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ verificarPassword, setVerificarPassword ] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent){
        event.preventDefault();
        try{
            const registrarUserTask = new RegistrarUsuarioTask({
                nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, password, verificarPassword
            });

            await registrarUserTask.execute();
            navigate('/game')
        }catch(e){
            switch((e as Error).message){
                case'ErrorFormularioIncompleto': window.alert('Olvidaste completar todos los campos del formulario');
                break;

                case'ErrorPaswordsNoCoinciden': window.alert('Las Contraseñas no coinciden');
                break;

                case'ErrorNombreUsuarioDuplicado': window.alert('El nombre de usuario que seleccionaste ya existe');
                break;

                default: window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    function handleNombresChange(event: ChangeEvent<HTMLInputElement>){
        const valorNombres = event.target.value;
        setNombre(valorNombres);
    }

    function handleApellidoPaternoChange(event: ChangeEvent<HTMLInputElement>){
        const valorApellidoPaterno = event.target.value;
        setAppellidoPaterno(valorApellidoPaterno);
    }

    function handleApellidoMaternoChange(event: ChangeEvent<HTMLInputElement>){
        const valorApellidoMaterno = event.target.value;
        setAppellidoMaterno(valorApellidoMaterno);
    }

    function handleCorreoChange(event: ChangeEvent<HTMLInputElement>){
        const valorCorreo = event.target.value;
        setCorreo(valorCorreo);
    }

    function handleNombreUsuarioChange(event: ChangeEvent<HTMLInputElement>){
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(event: ChangeEvent<HTMLInputElement>){
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="txtNombres">Nombre/s</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombres"
                        id="txtNombres"
                        value={nombre}
                        onChange={ handleNombresChange }
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="txtApellidoP">Apellido Paterno</Form.Label>
                    <Form.Control
                        type="text"
                        name="apellidoP"
                        id="txtApellidoP"
                        value={apellidoPaterno}
                        onChange={handleApellidoPaternoChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="txtApeliidoM">Apellido Materno</Form.Label>
                    <Form.Control
                        type="text"
                        name="apellidoM"
                        id="txtApellidoM"
                        value={apellidoMaterno}
                        onChange={handleApellidoMaternoChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="txtCorreo">Correo</Form.Label>
                    <Form.Control
                        type="email"
                        name="correo"
                        id="txtCorreo"
                        value={correo}
                        onChange={handleCorreoChange}
                    />
                </Form.Group>
                    
                <Form.Group>
                    <Form.Label htmlFor="txtNombreUsuario">Nombre de Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreUsuario"
                        id="txtNombreUsuario"
                        value={nombreUsuario}
                        onChange={handleNombreUsuarioChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="txtPassword">Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="txtPassword"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="txtConfirmPassword">Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="txtConfirmPassword"
                        value={verificarPassword}
                        onChange={handleVerificarPasswordChange}
                    />
                </Form.Group>

                <Button className="boton" type="submit" variant="primary">Registrar</Button>
            </Form>
        </>
    )
}