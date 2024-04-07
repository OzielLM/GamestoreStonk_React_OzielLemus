import './scss/sidebar.scss'
import { useState } from 'react';
import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Carousel, Card, Button, Row, Col, Container, Table} from 'react-bootstrap';
import TablaJuegos from './TablaJuegos';



export default function PaginaPrincipal() {
    return (
        <>
            <div className='backgroundPaginaPrincipal'>
                <div className="flex">
                    <AppSidebar />
                    <Container fluid>
                        <Row>
                            <Carousel fade className='d-flex h-75 justify-content-center'>
                                <Carousel.Item className='d-flex justify-content-center'>
                                    <img
                                    className="d-block d-flex w-75"
                                    src={require('../images/fornite.png')}
                                    alt="Fornite"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className='d-flex justify-content-center'>
                                    <img
                                    className="d-block d-flex w-75"
                                    src={require('../images/stonks.png')}
                                    alt="Stonks"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className='d-flex justify-content-center'>
                                    <img
                                    className="d-block d-flex w-75"
                                    src={require('../images/bioshock.jpg')}
                                    alt="Bioshock"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className='d-flex justify-content-center'>
                                    <img
                                    className="d-block d-flex w-75"
                                    src={require('../images/minecraft.jpg')}
                                    alt="Minecraft"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Row>
                        <Row className='continer rounded cards'>
                            <h1>Noticias</h1>
                            <h5>-Llega Bioshock Infinite a nuestra tienda</h5>
                            <h5>-Fornite estrena su nueva temporada</h5>
                            <h5>-Gran estreno de "Stonks the game"</h5>
                            <h5>-Checa nuestros descuentos de tienda</h5>
                        </Row>
                        <Row className='continer cards'>
                            <TablaJuegos />
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}