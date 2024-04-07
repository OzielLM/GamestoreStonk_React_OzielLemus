import { Application, Request, Response, Router } from "express";
import Usuario from "../models/entities/Usuario";
import DatabaseConnection from '../database/DatabaseConnection';
import Sesion from '../models/Sesion';
import HttpStatusCodes from 'http-status-codes';
import { QueryFailedError } from 'typeorm';

interface RegistroRequestBody{
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    nombreUsuario: string;
    password: string;
}

interface LoginRequestBody{
    nombreUsuario: string;
    password: string;
}

export default class AuthenticationController{
    private router: Router;

    private constructor(app: Application){
        this.router = Router();
        this.initializeRoutes();
        app.use('/auth', this.router);
    }

    private initializeRoutes(): void{
        this.router.post('/registro', this.registro);
        this.router.post('/login', this.login);
    }

    private async registro(req: Request, res: Response): Promise<void>{
        try {
            const { nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, password } = <RegistroRequestBody>req.body;

            if(!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !nombreUsuario ||!password){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
        
            const repositorioUsuarios = await DatabaseConnection.getRepository(Usuario)
        
            const nuevoUsuario = new Usuario();

            nuevoUsuario.nombre = nombre;
            nuevoUsuario.apellidoPaterno = apellidoPaterno;
            nuevoUsuario.apellidoMaterno = apellidoMaterno;
            nuevoUsuario.correo = correo;
            nuevoUsuario.nombreUsuario = nombreUsuario;
            nuevoUsuario.password = password;
            nuevoUsuario.fechaCreacion = new Date();
            nuevoUsuario.fechaActualizacion = new Date();

            await repositorioUsuarios.save(nuevoUsuario);

            const sesion = Sesion.crearParaUsuario(nuevoUsuario);

            res.status(HttpStatusCodes.OK).json(sesion);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'El nombre de usuario ya existe.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async login(req: Request, res: Response): Promise<void>{
        try {
            const { nombreUsuario, password } = <LoginRequestBody>req.body;

            if(!nombreUsuario || !password){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const repositorioUsuarios = await DatabaseConnection.getRepository(Usuario)

            const user = await repositorioUsuarios.findOneBy({nombreUsuario, password});

            if(user === null){
                res.status(HttpStatusCodes.UNAUTHORIZED).end();
            }else{
                const sesion = Sesion.crearParaUsuario(user);

                res.status(HttpStatusCodes.OK).json(sesion);
            }
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    }

    public static mount(app: Application): AuthenticationController{
        return new AuthenticationController(app);
    }
}
