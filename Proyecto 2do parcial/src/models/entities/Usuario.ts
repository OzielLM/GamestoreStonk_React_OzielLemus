import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'usuarios' })
export default class Usuario{
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public nombre: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    public apellidoPaterno: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    public apellidoMaterno: string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    public correo: string;

    @Column({ type: 'varchar', length: 12, nullable: false, unique: true })
    public nombreUsuario: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public password: string;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;
}