var express           = require('express');
var app               = express();
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var cors              = require("cors");
var {mongoose_config} = require('./config/config.js');
var corsOptions       = {
    origin: "http://localhost:8000"
  };

// Manage Http requests using cors
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Connect to database
mongoose.connect('mongodb://localhost:27017/rest_api');
var db = mongoose.connection;


// test database creation
app.get("/", (req, res) => {
    res.json({ message: "some message !" });
});
// specify the folder to manage routes
require('./routes/user.routes.js')(app);


// Run port 
const PORT = mongoose_config.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});