import Juego from "../models/Juego";
import JuegoService from "../services/JuegoService";

export default class ActualizarJuegoTask{
    private juego: Juego;

    public constructor(juego: Juego) {
        this.juego = juego;
    }

    public async execute(): Promise<void> {
        this.validar();
        await this.actualizarJuego();
    }

    private validar(): void {
        const { nombre, empresa, plataforma, año, cantidad, precio } = this.juego;

        if (!nombre || !empresa || !plataforma || !año || !cantidad || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async actualizarJuego(): Promise<void> {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorSesionExpiradaOInvalida');
        }

        const servicioAutos = new JuegoService(tokenSesion);
        await servicioAutos.actualizarJuego(this.juego, this.juego.id);
    }
}