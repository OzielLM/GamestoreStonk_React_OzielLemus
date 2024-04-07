import axios, { AxiosError } from 'axios';
import Juego from '../models/Juego';

interface GameConFormatoBackend{
    id: number;
    nombre: string;
    empresa: string;
    plataforma: string;
    año: number;
    cantidad: number;
    precio: number;
}

export default class JuegoService{
    private tokenSesion: string;
    private baseURL: string;

    public constructor(tokenSesion: string){
        this.tokenSesion = tokenSesion;
        this.baseURL = 'http://localhost:3001/game';
    }

    private get headers(){
        return{
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerListaJuego(): Promise<Juego[]>{
        try{
            const respuesta = await axios.get(
                this.baseURL,
                { headers: this.headers }
            );

            const listaJuegos = respuesta.data.map((game: GameConFormatoBackend) => (
                new Juego(
                    game.id,
                    game.nombre,
                    game.empresa,
                    game.plataforma,
                    game.año,
                    game.cantidad,
                    game.precio
                )
            ));

            return listaJuegos;
        }catch(e){
            if(e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 401: throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async obtenerPorID(id: number): Promise<Juego>{
        try{
            const respuesta = await axios.get(
                `${this.baseURL}/${id}`,
                { headers: this.headers }
            );

            const {
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            } = respuesta.data as GameConFormatoBackend;

            return new Juego(
                id,
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            );
        }catch(e){
            if( e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 401:   throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:   throw new Error('ErrorJuegoNoEncontrado');
                    default:    throw new Error('ErrorDesconocido');
                }
            }
            
            throw e;
        }
    }

    public async registrarJuego(game: Juego): Promise<Juego>{
        try{
            const respuesta = await axios.post(
                this.baseURL,
                game,
                { headers: this.headers }
            );

            const {
                id,
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            } = respuesta.data as GameConFormatoBackend;

            return new Juego(
                id,
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            );
        }catch(e){
            if(e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 400:   throw new Error('ErrorFormularioIncompleto');
                    case 401:   throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409:   throw new Error('ErrorNombreDuplicado');
                    default:    throw new Error('ErrorDesconocido');
                }
            }

            throw e;
        }
    }

    public async actualizarJuego(game: Juego, id: number): Promise<Juego>{
        try{
            const respuesta = await axios.put(
                `${this.baseURL}/${id}`,
                game,
                { headers: this.headers }
            );

            const {
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            } = respuesta.data as GameConFormatoBackend;

            return new Juego(
                id,
                nombre,
                empresa,
                plataforma,
                año,
                cantidad,
                precio
            )
        }catch(e){
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400:   throw new Error('ErrorFormularioIncompleto');
                    case 401:   throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:   throw new Error('ErrorJuegoNoEncontrado');
                    case 409:   throw new Error('ErrorNombreDuplicado');
                    default:    throw new Error('ErrorDesconocido');;
                }
            }

            throw e;
        }
    }

    public async eliminarJuego(game: Juego): Promise<void>{
        try{
            await axios.delete(
                `${this.baseURL}/${game.id}`,
                { headers: this.headers }
            );
        }catch(e){
            if(e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 401:   throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:   throw new Error('ErrorJuegoNoEncontrado');
                    default:    throw new Error('ErrorDesconocido');
                }
            }

            throw e;
        }
    }
}