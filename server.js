'use strict';

const Hapi = require('@hapi/hapi')
const db = require('./databse')

const setInterval = require('./controller/setInverval')


 const init = async ()=>{

   
    // const server = new Hapi.Server({
    //     port: 8082,
    //     host: "localhost"
    // })
    // server.route(require('./router'))

    db.connect().then(()=>{
        console.log('Coneccion exitosa')
    }).catch((err)=>{
        console.log(err)
    })
    setInterval()
    // await server.start()
    // console.log('Server run on port', server.info.uri)
    
    
}


init()

