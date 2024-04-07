import { Link, useNavigate } from 'react-router-dom';
import SidebarMenu, { SidebarMenuBody, SidebarMenuBrand } from 'react-bootstrap-sidebar-menu';
import './scss/sidebar.scss'
import { useState } from 'react';


export default function AppSidebar() {
    function desabilitado(){
        window.alert('Esta pagina no esta disponible');
    }
    
    return (
        <div className="sidebar bg-dark">
            <ul>
                <li>
                    <img className='icon' src={require('../images/home.png')} alt="Logo" width="25" height="25"/>
                    <Link to="/game">Inicio</Link>
                </li>
                <li>
                    <img className='icon' src={require('../images/biblioteca.png')} alt="Logo" width="25" height="25"/>
                    <Link to="/game/biblioteca">Biblioteca</Link>
                </li>
                <li>
                    <img className='icon' src={require('../images/ofert.png')} alt="Logo" width="25" height="25"/>
                    <Link to="#" onClick={desabilitado}>Ofertas</Link>
                </li>
            </ul>
        </div>
    );
}
