var mongoose =require('mongoose')

var bcrypt = require('bcryptjs')

var userschema = mongoose.Schema({
    username:{
        type:String,
        index:true,
    },
    password:{
        type:String,
    },
    firstname:{
        type:String,
    },
    secondname:{
        type:String,
    },
    email:{
        type:String,
    },
    role:{
        type:String,
    },
})

var User = module.exports = mongoose.model('User',userschema);

// -------------------------- User model to communicate with database and make crud operation -------------------
module.exports.createUser = (user) => {
    bcrypt.genSalt(10, (err,salt) => {
       bcrypt.hash(user.password, salt, (err,hash) => {
            user.password=hash;
            user.save();
       })
    });

}


module.exports.getUserByUsername = (username) => {
    var query = {username: username};
    return User.findOne(query);
}
    
    
module.exports.getUserById = (id) => {
    return User.findById(id);
}
module.exports.findAll = () => {
    return User.find({});
}
module.exports.deleteUserById = (id) => {
    return User.deleteOne({"_id": id});
}
module.exports.updateUserById = (id,username,firstname,secondname,email,password,role) =>{
    return User.findByIdAndUpdate(id,
                                    {
                                    username  : username,
                                    firstname : firstname,
                                    secondname: secondname,
                                    email     : email,
                                    password  : password,
                                    role      : role
                                }
        );
}
module.exports.deleteAll = () =>{
    return User.deleteMany({});
}