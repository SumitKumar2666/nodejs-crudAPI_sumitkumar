const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');
const protectRoute = require('../middlewares/protectRoute.js');


// to create a user
router.post('/create', protectRoute, crudController.create); 

// to find a single user by id
router.post('/findbyid/:id',protectRoute, crudController.findById);

// to find all users
router.post('/findall',protectRoute, crudController.findAll);

// to update a user
router.post('/update/:id',protectRoute, crudController.update);

// to delete a user
router.post('/delete/:id',protectRoute, crudController.dlt);

module.exports = router;