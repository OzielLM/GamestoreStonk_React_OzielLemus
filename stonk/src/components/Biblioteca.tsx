import { useState } from 'react';
import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Carousel, Card, Button, Row, Col, Container, Table} from 'react-bootstrap';
import TablaJuegos from './TablaJuegos';

export default function Biblioteca(){
    return(
        <>
            <Router>
                <AppNavbar />
                <div className="flex">
                    <AppSidebar />
                    <Container>
                        <Row className='container cards'>
                        <TablaJuegos />
                        </Row>
                    </Container>
                </div>
            </Router>
        </>
    )
}