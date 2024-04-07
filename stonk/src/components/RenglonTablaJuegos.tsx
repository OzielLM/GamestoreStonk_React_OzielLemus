import { useNavigate } from 'react-router-dom';
import Juego from '../models/Juego';

interface RenglonTablaJuegosProps {
    juego: Juego
}

export default function RenglonTablaJuegos(
    { juego }: RenglonTablaJuegosProps
) {
    const navigate = useNavigate();

    function navegarADetalleDeJuego(){
        navigate(`/game/${juego.id}`);
    }

    return (
        <>
            <tr className='renglon-tabla-autos' onClick={navegarADetalleDeJuego}>
                <td>{juego.nombre}</td>
                <td>{juego.empresa}</td>
                <td>{juego.plataforma}</td>
                <td>{juego.año}</td>
                <td>{juego.cantidad}</td>
                <td>{juego.precio}</td>
            </tr>
        </>
    );
}