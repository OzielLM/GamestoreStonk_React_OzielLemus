import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RegistroUsuario from './components/routes/RegistroUsuario';
import InicioSesion from './components/routes/InicioSesion';
import Home from './components/routes/Home';
import Game from './components/routes/Game';
import RutaPaginaPrincipal from './components/routes/RutaPaginaPrincipal';
import Biblioteca from './components/routes/Biblioteca';
import RegistrarGame from './components/routes/RegistrarGame';
import DetalleJuego from './components/routes/DetalleJuego';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to="/login" />
      },
      {
        path: '/registro',
        element: <RegistroUsuario />
      },
      {
        path: '/login',
        element: <InicioSesion />
      }
    ]
  },
  {
    path: '/game',
    element: <Game/>,
    children: [
      {
        path: '/game',
        index: true,
        element: <RutaPaginaPrincipal/>
      },
      {
        path: '/game/biblioteca',
        element: <Biblioteca/>
      },
      {
        path: '/game/registro',
        element: <RegistrarGame/>
      },
      {
        path: '/game/:idJuego',
        element: <DetalleJuego/>
      }
    ]
  }
  
]);

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
