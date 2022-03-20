const { params } = require('@hapi/hapi/lib/validation')
const db = require('../databse')
const ObjectId = require('mongodb').ObjectId


const getDriver =async(req, reply)=>{

    const driver = await db.get().collection('driver')
        .findOne({_id:  new ObjectId (req.params.id)})
        console.log(driver)
    return reply.response(driver)
}

const getDrivers =async  (req, reply)=>{
    const drivers= await db.get().collection('driver')
        .find().toArray()
        console.log(drivers)
    return reply.response(drivers)
}

const updateDriver = async (req, reply) =>{

    
    try {
        
        const driverMobileVerified = await db.get().collection('driver')
            .updateOne(
                {_id: new ObjectId(req.params.id)},
                {
                    $set: req.payload
    
                    
                }
                )
         return reply.response('driver actualizado')
               
        
    } catch (error) {
        console.log(error)
    }
    return reply.response('driver actualizado')
}

const deleteDriver = async(req, reply) =>{
    const driverDelete = await db.get().collection('driver')
        .findOneAndDelete({_id: new ObjectId(req.params.id)})
        console.log(driverDelete)
    return reply.response('Driver removed')
}

const updateSetOne = async (req, reply) =>{

    
    try {
        
        const updateSetOne = await db.get().collection('driver')
            .findOneAndUpdate(
                {_id: new ObjectId(req.params.id)},
                {
                    "$set": {
                        status: 4
                    }
    
                    
                }
                )
         return reply.response('driver actualizado')
               
        
    } catch (error) {
        console.log(error)
    }
    return reply.response('driver set actualizado')
}

module.exports = {
    getDriver,
    getDrivers,
    updateDriver,
    deleteDriver,
    updateSetOne
}