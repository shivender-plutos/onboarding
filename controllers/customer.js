const knex = require('../db/db');

const getList = async (req, res)=>{
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
}

const getByID =  async (req, res)=>{
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
}

const add = async (req, res)=>{
    console.log(`customerAdd api hit, CUSTOMER:${JSON.stringify(req.body)}`);
    let customer = (req.body);
    try {
        let id = await knex('customers')
                    .insert(customer)
                    .then((id)=> id)
        return res.status(200).json({
            status: "success",
            data: id
        })
    } catch (error) {
        console.log('error:'+error);
        return res.status(500).json({
            status:"failed",
            error: error
        })
    }
}

const deleteByID = async (req, res)=>{
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
}

const updateByID = async (req, res)=>{
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
}

module.exports ={
    getList,
    getByID,
    add,
    deleteByID,
    updateByID
}