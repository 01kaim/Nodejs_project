module.exports = app => {

const user = require('../controllers/user.controller.js');

var router = require('express').Router();

// Create a new User
router.post("/", user.create);

// Retrieve all users
router.get("/", user.findAll);

// show user by id
router.get("/:id", user.findOne);

// Update a user with id
router.put("/:id", user.update);

// Delete a user with id
router.delete("/:id", user.delete);

// Delete all users
router.delete("/", user.deleteAll);
app.use('/api/users', router)

}

