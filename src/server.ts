import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/users.routes'
import { createConnection } from 'typeorm'

export class Server {
    private server: Application;

    constructor(private port?: string | number){
        this.server = express();
        this.settings();
        this.database()
        this.middlewares();
        this.routes()
    }

    settings(){
        this.server.set('port', process.env.PORT || this.port);
    }
    database(){
        createConnection();
    }
    middlewares(){
        this.server.use(morgan('dev'));
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }
    routes(){
        this.server.use(userRoutes)
    }
    async listen(){
        await this.server.listen(this.server.get('port'));
        console.log('server listen on port ' + this.server.get('port'))
    }
}