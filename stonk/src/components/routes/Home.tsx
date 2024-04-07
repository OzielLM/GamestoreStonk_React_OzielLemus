import { Outlet } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import './scss/Home.scss'

export default function Home(){
    return(
        <>
            <Navbar  bg="dark" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand>
                        <img
                        alt=""
                        src={require('../../images/Stonk-meme.png')}
                        width="35"
                        height="50"
                        />{' '}
                        Bienvenido a Stonk!!!
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid className="login-registro">
                <Outlet/>
            </Container>
        </>
    )
}