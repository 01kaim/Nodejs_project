const User = require("../models/user.model.js");

exports.create = (req, res) => {
    // Retrieve post data
    var username   = req.body.username;
    var firstname  = req.body.firstname;
    var secondname = req.body.secondname;
    var email      = req.body.email;
    var password   = req.body.password;
    var role       = req.body.role;


    // create the user
    var newUser = new User({
        username  : username,
        firstname : firstname,
        secondname: secondname,
        email     : email,
        password  : password,
        role      : role
    });
     User.createUser(newUser);
     return res.json(newUser);
}
exports.findAll = (req, res) => {
   // get all users
   User.findAll().then((users) =>{
    // return all users from the retrieved db collection
    res.send.json({
    // specify count and map to get data from the collection
        count : users.length,
        User : users.map(user =>{
              return{
                    _id       : user._id,
                    username  : user.username,
                    firstname : user.firstname,
                    secondname: user.secondname,
                    email     : user.email,
                    password  : user.password,
                    role      : user.role
              }
        })
    })
   })
   .catch((err) => {
        console.log(err.message)
    });

}
// Find user by the given id
exports.findOne = (req, res) => {
   User.getUserById(req.params.id).then((user) => {
          res.json({
            data: user
        }); 
   })
   .catch((err) => {
     console.log(err.message)
    });
}
// Updated user from the given id
exports.update = (req, res) => {
   // prepare data from the given querry
   var id         = req.query.id;
   var username   = req.query.username;
   var firstname  = req.query.firstname;
   var secondname = req.query.secondname;
   var email      = req.query.email;
   var password   = req.query.password;
   var role       = req.query.role;
   // update user by id
   User.updateUserById(id,username,firstname,secondname,email,password,role)
       .then((response) => {
             return res.json(id+" "+username+" "+firstname+" "+secondname+" "+email+" "+password+" "+role);  
         })
        .catch((err) => {
            console.log(err.message)
        });

}
// Delete user by the given id
exports.delete = (req, res) => {
    var userToDelete =  User.getUserById(req.params.id)
                            .then((user) => {
                                    // if user already exists on the db collection
                                    if(user){
                                        User.deleteUserById(req.params.id)
                                            .then((user) => {
                                            res.json("User deleted with the given id: " + req.params.id);
                                            })
                                            .catch((err) => {
                                                console.log(err.message)
                                            });
                                        }
                                        else{
                                            res.json("User not found with the given id: " + req.params.id);
                                        }
                            })
                            .catch((err) => {
                                console.log(err.message)
                            });
}
// Delete all user
exports.deleteAll = (req, res) => {
    User.deleteAll().then((response) => {
            return res.json("All users deleted !");
    })
    .catch((err) => {
        console.log(err.message)
    });
}