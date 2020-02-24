const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'}); //pass object to specify the path where our config file is located.
//const app = require('./app'); //always require app file atfer environment variables are reead from config file.
const DB1 = process.env.DATABASE; //to connect with the database on mongoose atlas.
// const DB = process.env.DATABASE_LOCAL; //to connect with the local database.
const db = mongoose.connect(DB1,{ //To connect to db, 1st connection string 2nd options for deprication warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => { //This connection returns a promise so handle that.
    console.log('DB connection successful');
}); //.catch(err => console.log("Error in connected database " , err));

// const port = 6000 || process.env.PORT; //port should be coming from either environment or 4000
// const server = app.listen(port,()=>{
//     console.log(`App running on port ${port}`);
// });
module.exports = db;

