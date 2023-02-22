const express = require('express');
const knex = require('./db/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// get list of all customers
app.get('/v1/customer/list', async (req, res)=>{
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
app.get('/v1/customer/:id', async (req, res)=>{
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
app.post('/v1/customer/add', async (req, res)=>{
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

//delete customer

const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));