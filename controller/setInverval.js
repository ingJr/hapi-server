const Hapi = require('@hapi/hapi')



const servidor =async()=>{
    const server = new Hapi.Server({
            port: 8082,
            host: "localhost"
        })
        server.route(require('../router'))
        await server.start()
        console.log('Server run on port', server.info.uri)
    setInterval(()=>{
        
        console.log('Server run on port', server.info.uri)
    },5000)
}

module.exports = servidor


