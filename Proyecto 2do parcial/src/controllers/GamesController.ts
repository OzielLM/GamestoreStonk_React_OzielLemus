import {Application, Request, Response, Router} from 'express';
import Game from '../models/entities/Game';
import HttpStatusCodes from 'http-status-codes';
import Sesion from '../models/Sesion';
import DatabaseConnection from '../database/DatabaseConnection';
import { QueryFailedError } from 'typeorm';

interface CreateUpdateRequestBody
{
    nombre: string;
    empresa: string;
    plataforma: string;
    año: number;
    cantidad: number;
    precio: number;
}

export default class GamesController
{
    private router: Router;
    private constructor(app: Application)
    {
        this.router = Router();
        this.initializeRoutes();
        app.use('/game', this.router)
    }

    private initializeRoutes(): void
    {
        this.router.all('*', Sesion.verificarTokenSesion)

        this.router.post('/', this.create)
        this.router.get('/', this.read)
        this.router.put('/:id', this.update)
        this.router.delete('/:id', this.delete)
        this.router.get('/:id', this.readSpecific)
    }

    private async create(req: Request, res: Response): Promise <void>
    {
        try{
            const { nombre, empresa, plataforma, año, cantidad, precio } = <CreateUpdateRequestBody>req.body;
            
            if(!nombre || !empresa || !plataforma || !año || !cantidad || !precio){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            };

            const repositorioJuegos = await DatabaseConnection.getRepository(Game);

            const nuevoJuego = new Game();
            nuevoJuego.nombre = nombre;
            nuevoJuego.empresa = empresa;
            nuevoJuego.plataforma = plataforma;
            nuevoJuego.año = año;
            nuevoJuego.cantidad = cantidad;
            nuevoJuego.precio = precio;

            await repositorioJuegos.save(nuevoJuego);

            res.status(HttpStatusCodes.OK).json(nuevoJuego);
        }catch(e){
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe el juego.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async read(req: Request, res: Response): Promise <void>
    {
        try{
            const repositorioJuegos = await DatabaseConnection.getRepository(Game);
            const juegos = await repositorioJuegos.find()
            if(!juegos){
                res.status(HttpStatusCodes.NOT_FOUND).end();
            }else{
                res.status(HttpStatusCodes.OK).json(juegos);
            };
        }catch(e){
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async update(req: Request, res: Response): Promise <void>
    {
        try{
            
            const { nombre, empresa, plataforma, año, cantidad, precio } = <CreateUpdateRequestBody>req.body;
            const id = parseInt(req.params.id);
            
            
            if(!nombre || !empresa || !plataforma || !año || !cantidad || !precio){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            };

            const repositorioUpdate = await DatabaseConnection.getRepository(Game);
            const juego = await repositorioUpdate.findOneBy({id});

            if(juego === null){
                res.status(HttpStatusCodes.NOT_FOUND).end()
            }else{
                const nuevaUpdate = juego;
                nuevaUpdate.nombre = nombre;
                nuevaUpdate.empresa = empresa;
                nuevaUpdate.plataforma = plataforma;
                nuevaUpdate.año = año;
                nuevaUpdate.cantidad = cantidad;
                nuevaUpdate.precio = precio;         
            
                await repositorioUpdate.save(nuevaUpdate);
                res.status(HttpStatusCodes.OK).json(nuevaUpdate);
            };      
        }catch(e){
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe el juego.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async delete(req: Request, res: Response): Promise <void>
    {
        try{
            const id = parseInt(req.params.id);
            const repositorioDelete = await DatabaseConnection.getRepository(Game);
            const juego = await repositorioDelete.findOneBy({id})
            
            if(!juego){
                res.status(HttpStatusCodes.NOT_FOUND).end('No se encontro elemento')
            }else{
                const repositorioJuegos = await DatabaseConnection.getRepository(Game);

                const juego = await repositorioJuegos.delete(id);

                res.status(HttpStatusCodes.OK).json(juego);
            }
        }
        catch(e){
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async readSpecific(req: Request, res: Response): Promise <void>
    {
        try{
            const id = parseInt(req.params.id);
            const repositorioJuegos = await DatabaseConnection.getRepository(Game);
            const juego = await repositorioJuegos.findOneBy({id});
            if(!juego){
                res.status(HttpStatusCodes.NOT_FOUND).end();
            }else{
                res.status(HttpStatusCodes.OK).json(juego);
            }
            
        }catch(e){
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end("Internal server error");
        }
    }
    
    public static mount(app: Application): GamesController {
        return new GamesController(app);
    }
}