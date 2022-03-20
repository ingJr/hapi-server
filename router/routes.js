const post = require('./insertDriver')
const Joi = require('@hapi/joi')
const getUpdate = require('./getUpdate')

module.exports = [{
    method:"POST",
    path: "/driver",
    // options:{
    //     validate: {
    //         payload: post.validator
    //     }
    // },
    handler: post.handler
},
{
    method:"GET",
    path: "/driver",
    handler: getUpdate.getDrivers
},
{
    method:"GET",
    path: "/driver/{id}",
    handler: getUpdate.getDriver
},
{
    method:"DELETE",
    path: "/driver/{id}",
    handler: getUpdate.deleteDriver
},
{
    method:"PUT",
    path: "/driver/{id}",
    handler: getUpdate.updateDriver
},

{
    method: "PATCH",
    path: "/driver/{id}/status",
    handler: getUpdate.updateSetOne
}
]