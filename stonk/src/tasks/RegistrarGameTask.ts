import Juego from "../models/Juego";
import JuegoService from "../services/JuegoService";

export default class RegistrarGameTask{
    private game: Juego;

    public constructor(game: Juego){
        this.game = game;
    }

    public async execute(): Promise<void>{
        this.validar();
        await this.registrarJuego();
    }

    private validar(): void{
        const { nombre, empresa, plataforma, año, cantidad, precio } = this.game;

        if( !nombre || !empresa || !plataforma || !año || !cantidad || !precio ){
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async registrarJuego(): Promise<void>{
        const tokenSesion = localStorage.getItem('tokenSesion');

        if( !tokenSesion ){
            throw new Error('ErrorSesionExpiradaOInvalida');
        }

        const servicioGame = new JuegoService(tokenSesion);
        await servicioGame.registrarJuego(this.game);
    }
}