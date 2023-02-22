const express = require('express');
const dotenv = require('dotenv');
const customerRoute = require('./routes/customer');

dotenv.config();
const app = express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.use("/v1/customer",customerRoute)

const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));