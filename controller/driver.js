const db = require('../databse')



const isExist = (params, callback)=>{
    db.get().collection('driver')
        .findOne({
            $or:[
                {email: params.email},
                {mobile: params.mobile}
            ]
        },
        (err, result)=>{
            return callback(err, result)
        })

}

const Existe =  (params)=>{
    return new Promise((res, rej)=>{
        
            
           db.get().collection('driver').findOne( {email: params.email},(err,find)=>{

            if(err){
                rej('Ya existen')
            }else{
                res(find)
            }

           })
              
        })
}

const driverSave = (params, callback)=>{
        db.get().collection('driver')
        .insertOne(params,
            (err, result)=>{return callback(err, result)})
        
}


const GuardarConductor =(params)=>{
    return new Promise((res, rej)=>{
        db.get().collection('driver')
        .insertOne(params,(err,save)=>{
            if(err){
                rej('Error al guardar')
            }
        })
        res(save)    
    })
}

module.exports={
    driverSave,
    isExist,
    Existe,
    GuardarConductor
}


