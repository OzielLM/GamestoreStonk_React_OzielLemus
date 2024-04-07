import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'juegos' })
export default class Game{
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public empresa: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public plataforma: string;

    @Column({ type: 'smallint', nullable: false })
    public año: number;

    @Column({type: 'mediumint', nullable: false})
    public cantidad: number;

    @Column({ type: 'decimal', nullable: false})
    public precio: number;
}