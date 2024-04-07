export default class Juego{
    public id  : number;
    public nombre: string;
    public empresa: string;
    public plataforma: string;
    public año: number;
    public cantidad: number;
    public precio: number;
        
    public constructor(
        id: number | undefined,
        nombre: string,
        empresa: string,
        plataforma: string,
        año: number,
        cantidad: number,
        precio: number
    ){
        this.id = id as number;
        this.nombre = nombre;
        this.empresa = empresa;
        this.plataforma = plataforma;
        this.año = año;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
