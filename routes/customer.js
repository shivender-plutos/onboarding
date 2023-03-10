const express = require('express');
const { getList, getByID, add, deleteByID, updateByID } = require('../controllers/customer');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// get list of all customers
router.get('/', getList);

//get customer by id
router.get('/:id', getByID);

//add customer
router.post('/', add);

//delete customer by id
router.delete('/', deleteByID);

//update customer
router.put('/:id', updateByID);

module.exports=router