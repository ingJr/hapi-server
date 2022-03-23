'use strict'

//const {MongoClient} = require('mongodb')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

var state = { db: null };
const db = 'rinnDB';
//const url = 'mongodb+srv://root_DB:uMZjGJ6nsxRYR8NV@cluster0.sixcs.mongodb.net/rinnDB'
const url = 'mongodb://root_DB:uMZjGJ6nsxRYR8NV@localhost:27017/rinnDB?authSource=admin'
//const url = 'mongodb://localhost:27017/rinnDB'

const connect =()=>{
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then((client) => {
           console.log(`MongoDB connection successfully established`);
            state.db = client.db(db);
           console.log(`MongoDB using ${db} dataBase`);
            return resolve(client);
        }).catch((err) => {
           console.log(`MongoDB connection error ${err}`);
            return reject(err);
        });

    })
    
}
const get = () => { return state.db }



module.exports = {
    connect,
    get
}