var dotenv = require('dotenv');
dotenv.config();
module.exports ={
    mongoose_config: {
        host    : process.env.host,
        port    : process.env.port,
        user    : process.env.user,
        password: process.env.password,
        database: process.env.database
    }
}