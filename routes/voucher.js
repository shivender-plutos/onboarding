const express = require('express');
const { updateByID } = require('../controllers/voucher');
const router = express.Router();

router.patch('/:id', updateByID); 

module.exports=router