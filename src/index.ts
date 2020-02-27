if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
import { Server } from './server'
import 'reflect-metadata'
async function main(){
    const server = new Server(4000)
    await server.listen()
}
main()