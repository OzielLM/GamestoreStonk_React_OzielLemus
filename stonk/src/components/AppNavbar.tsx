import { Container, Nav, Navbar, Dropdown, DropdownButton, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function AppNavbar() {
    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem('tokenSesion');
        navigate('/login');
    }

    function desabilitado(){
        window.alert('Esta pagina no esta disponible');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>
                    <img className='icon' src={require('../images/Stonk-meme.png')} alt="Logo" width="35" height="50" />
                    Stonks
                </Navbar.Brand>
                <Nav>
                    <DropdownButton variant='dark' id="dropdown-basic-button" title="U">
                        <Dropdown.Item onClick={desabilitado}>Cuenta</Dropdown.Item>
                        <Dropdown.Item onClick={desabilitado}>Configuraciónes</Dropdown.Item>
                        <Dropdown.Item onClick={desabilitado}>Cupones</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="outline-danger"onClick={cerrarSesion}>Cerrar Sesion</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}
