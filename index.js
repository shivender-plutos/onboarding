const express = require('express');
const dotenv = require('dotenv');
const customerRoute = require('./routes/customer');
const voucherRoute = require('./routes/voucher');
const uploadFile = require('./middleware/uploadFile');
const { upload } = require('./controllers/voucher');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// POST REQ WITH MULTER

// upload voucher excel and store in db
app.post('/v1/voucher', uploadFile.single("vouchers") ,upload);

app.use("/v1/customer",customerRoute);
app.use("/v1/voucher",voucherRoute);

const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));