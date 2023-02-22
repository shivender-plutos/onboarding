const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const knex = require('../db/db');

// get list of all customers
router.get('/list', async (req, res)=>{
    console.log(`get list api hit`);
    try {
        let list = []
        list = await knex('customers')
                    .select("*")
                    .then((customers)=> customers)
        return res.status(200).json({
            status: "success",
            data: list
        })
    } catch (error) {
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
});

//get customer by id
router.get('/:id', async (req, res)=>{
    console.log(`getById api hit, ID:${req.params.id}`);
    let id = parseInt(req.params.id);
    try {
        let customer = []
        customer = await knex('customers')
                    .select("*")
                    .where({id})
                    .then((customer)=> customer)
        return res.status(200).json({
            status: "success",
            data: customer
        })
    } catch (error) {
        console.log('error:'+error);
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
});

//add customer
router.post('/add', async (req, res)=>{
    console.log(`customerAdd api hit, CUSTOMER:${JSON.stringify(req.body)}`);
    let customer = (req.body);
    try {
        let recordCount = await knex('customers')
                    .insert(customer)
                    .then((recordCount)=> recordCount)
        return res.status(200).json({
            status: "success",
            data: recordCount
        })
    } catch (error) {
        console.log('error:'+error);
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
});

//delete customer by id
router.delete('/delete', async (req, res)=>{
    console.log(`deleteById api hit, ID:${req.query.id}`);
    let id = parseInt(req.query.id);
    try {
        let recordsDeleted = []
        recordsDeleted = await knex('customers')
                    .where({id})
                    .del()
                    .then((customer)=> customer)
        return res.status(200).json({
            status: "success",
            data: recordsDeleted
        })
    } catch (error) {
        console.log('error:'+error);
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
});

//update customer
router.put('/update/:id', async (req, res)=>{
    console.log(`customerUpdate api hit, ID:${req.params.id}`);
    let id = parseInt(req.params.id)
    console.log(`Customer: ${JSON.stringify(req.body)}`);
    let customer = (req.body);
    console.log(customer);
    try {
        let recordsUpdated=[]
        recordsUpdated = await knex('customers')
                    .where({id})
                    .update(customer)
                    .then((recordsUpdated)=> recordsUpdated)
        return res.status(200).json({
            status: "success",
            data: recordsUpdated
        })
    } catch (error) {
        console.log('error:'+error);
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
});

module.exports=router