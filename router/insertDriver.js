
const moment = require('moment')
const {Timestamp} = require('mongodb')
const Joi = require('@hapi/joi')
const driver = require('../controller/driver')
const db = require('../databse')
const async = require('async')

const handler = (req, h)=>{
   
    var userdata = {
          email: req.payload.email,
          password: req.payload.password,
          firstName: req.payload.firstName,
          lastName: req.payload.lastName || "",
          profilePic: req.payload.profilePic,
          countryCode: req.payload.countryCode,
          mobile: req.payload.mobile,
          zipCode: req.payload.zipCode,
          status: 1,
          dob: req.payload.dateOfBirth ? req.payload.dateOfBirth : "",
          statusMsg: "New",
          companyId: 0,
          zones: req.payload.zones || [],
          serviceZones: req.payload.zones || [],
          // specialities: [],
          driverType: req.payload.accountType,
          driverLicense: req.payload.driverLicense,
          cityId: req.payload.cityId ? req.payload.cityId : "",
          cityName: req.payload.cityName ? req.payload.cityName : "",
          location: { longitude: 0, latitude: 0 },
          createdDate: moment().unix(),
          createdTimestamp: new Timestamp(1, moment().unix()),
          createdISOdate: new Date(),
          driverLicenseFront:  "",
          driverLicenseBack:  "",
          driverLicenseNumber: req.payload.driverLicenseNumber ? req.payload.driverLicenseNumber : "",
          driverLicenseExpiry: req.payload.driverLicenseExpiry ? req.payload.driverLicenseExpiry : "",
          mobileDevices: {
            lastLogin: moment().unix(),
            appVersion: req.payload.appVersion ? req.payload.appVersion : ""
          },
      
          mobileVerified: true,
          wallet: {
            balance: 0,
            blocked: 0,
            hardLimit: 0,
            softLimit: 0,
            softLimitHit: false,
            hardLimitHit: false
          },
          acceptance: {
            acceptedBookings: 0,
            totalBookings: 0,
            acceptanceRate: 0,
            ignoredBookings: 0,
            rejectedBookings: 0,
            cancelledBookings: 0
          },
        
        };
        

        return new Promise((res, rej)=>{
          driver.Existe({email:userdata.email, mobile: userdata.mobile})
          .then(r=>{
            if(r === null){
              console.log('aqui')
             driver.GuardarConductor(userdata)
              .then((r)=>{
               console.log(r)
              return res({message:'conductor almacenado'})
             }).catch((err)=>{
                 console.log(err)
               })
            }
            console.log(r)
           
            if (r.email === userdata.email ){
              console.log('email  existe')
               return res({message:'email  existe'})
             }
                     
          }).catch(err=>console.log(err))
         
          return res({message:'email  saved'})
        })

             
          
          // const GuardarDriver = driver.GuardarConductor(userdata)
          // GuardarDriver.then((result)=>{
          //     console.log('conductor almacenado')
          //    return res('conductor almacenado')
          //   }).catch((err)=>{
          //       console.log('existen......')
          //     })
                  
                
          
        


          
          // return new Promise((res, rej)=>{
    
          //   async.waterfall([
     
          //      cb=>{
                 
          //        driver.isExist(
          //          {email:userdata.email, mobile: userdata.mobile},
          //          (err, doc)=>{
          //            if(err){
          //              console.log('ocurrio un error', err)
          //              return "error"
          //            }
          //            if (doc === null) {
          //              return cb(null, true);
          //            }
                       
                     
          //            if (typeof doc.email != "undefined" && doc.email === userdata.email){
          //              console.log('email ya existe"')
          //              return res({message: "email existente"})
                      
          //            }
                     
          //            if (typeof doc.mobile != "undefined" && doc.mobile === userdata.mobile){
     
          //             console.log('mobile ya existe"')
          //             return res({message: "mobile existente"})
          //            }
                     
          //          }
          //        )
          //      },
          //      (toContinue, cb)=>{
                
          //        driver.driverSave(userdata,(err, result)=>{
          //          if(err){
          //            console.log("Error guardando conductor", err)
          //          }
          //          return cb(null, true)
                   
          //        })
                 
          //      }
     
          //    ],
          //    (err, data)=>{
          //      if(err){
          //        return res(err);
                 
          //      } 
               
          //      return res({message:"Driver saved2"})
          //    }
          //    )
          // })  

          // waterfall().then((result)=>{
          //   return h.response(result).code(200)
          // }).catch((err)=>{
          //   return h.response(err).code(400)
          // })
     
        
        
        //return userdata
        
        
}


const validator  = Joi.object( {
    firstName: Joi.string()
      .required()
      .description("First name"),
    lastName: Joi.any().description("Last name"),
    email: Joi.string()
      .trim()
      .empty("")
      .email()
      .required()
      .description("Email"),
    password: Joi.string()
      .required()
      .description("Password"),
    countryCode: Joi.string()
      .trim()
      .empty("")
      .required()
      .description("Country code"),
    mobile: Joi.string()
      .trim()
      .empty("")
      .required()
      .description("Mobile"),
    zipCode: Joi.string().description("Zip code"),
    latitude: Joi.number()
      .required()
      .description("Latitude"),
    longitude: Joi.number()
      .required()
      .description("Longitude"),
    profilePic: Joi.string()
      .required()
      .description("Profile pic"),
    referral: Joi.any().description("In case of referral"),
    // zones: Joi.any().description('Provide array'),
    zones: Joi.array()
      .items()
      .description("Provide array"),
    operator: Joi.any().description("Operator ID"),
    driverLicense: Joi.string()
      .allow("")
      .description("Give all images comma(,) separated"),
    accountType: Joi.number()
      .required()
      .description("1 - Freelancer,2- store"),
    deviceType: Joi.number()
      .required()
      .integer()
      .min(1)
      .max(2)
      .description("1 - Ios,2 - Android"),
    deviceId: Joi.string().required(),
    deviceOsVersion: Joi.string().description("Device Os Version"),
    appVersion: Joi.string().description("Version of the app being used"),
    deviceMake: Joi.string().description("Maker of the device"),
    deviceModel: Joi.string().description("Model of the device"),
    pushToken: Joi.string().description("Push token of the device"),
    ipAddress: Joi.string().description("Ip Address"),
    driverLicenseNumber: Joi.string()
      .allow("")
      .description("driverLicenseNumber")
      .allow(""),
    driverLicenseExpiry: Joi.string()
      .allow()
      .description("driverLicenseExpiry")
      .allow(""),
    cityId: Joi.string()
      .description("cityId")
      .allow(""),
    cityName: Joi.string()
      .description("cityName")
      .allow(""),
    dateOfBirth: Joi.string()
      .description("dateOfBirth")
      .allow(""),
   
  });

module.exports={
    handler,
    validator
}