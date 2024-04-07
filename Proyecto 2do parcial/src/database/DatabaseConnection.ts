import { DataSource, ObjectLiteral, EntityTarget, Repository } from 'typeorm';
import Game from '../models/entities/Game';
import Usuario from '../models/entities/Usuario';

export default class DatabaseConnection{
    private static dataSource?: DataSource;

    public static async getConnectedInstance(): Promise<DataSource> {
        if(!DatabaseConnection.dataSource){
            DatabaseConnection.dataSource = new DataSource({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'game_shop',
                synchronize: true,
                entities: [Usuario, Game]
            });
        }

        if(!DatabaseConnection.dataSource.isInitialized){
            await DatabaseConnection.dataSource.initialize();
        }

        return DatabaseConnection.dataSource;
    }

    public static async getRepository<Entity extends ObjectLiteral>(
        EntityTarget: EntityTarget<Entity>
    ): Promise<Repository<Entity>> {
        const connection = await DatabaseConnection.getConnectedInstance();
        return connection.getRepository(EntityTarget);
    }
}
