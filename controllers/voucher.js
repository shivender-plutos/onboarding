const Voucher = require("../models/Voucher");
const path = require('path');
const readXlsxFile = require('read-excel-file/node');

const upload = async (req, res) => {
    console.log(`add voucher excel api hit`);
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "failed",
                message: "please select file"
            })
        }
        let sheetPath = req.file.path
        readXlsxFile(sheetPath).then(async (rows) => {
            rows.shift();
            let vouchers = [];
            rows.forEach((row) => {
                let voucher = {
                    voucher_code: row[0],
                    coupon_code: row[1],
                    brand_name: row[2],
                    type: row[3],
                    expiry_date: row[4],
                    discount: row[5]
                }
                vouchers.push(voucher)
            });
            await Voucher.query().insertGraph(vouchers)
                .then((result) => {
                    return res.status(200).json({
                        status: "success",
                        data: result
                    })
                })
                .catch((err) => {

                    return res.status(400).json({
                        status: "failed",
                        msg: err.nativeError.sqlMessage
                    })
                });
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            error: error
        })
    }
}

const updateByID = async (req, res) => {
    console.log(`voucherUpdate api hit, ID:${req.params.id}`);
    let id = parseInt(req.params.id);
    console.log(`Voucher: ${JSON.stringify(req.body)}`);
    let voucher = req.body;
    if(Object.keys(voucher).length == 0){
        return res.status(400).json({
            status: "failed",
            msg: "Please enter column"
        })
    }
    console.log(voucher);
    try {
        await Voucher.query().findById(id).patch(voucher)
            .then((result) => {
                console.log("result: " + result);
                return res.status(200).json({
                    status: "success",
                    data: result
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    status: "failed",
                    msg: err.nativeError.sqlMessage
                })
            })
    } catch (error) {
        console.log('error:' + error);
        return res.status(500).json({
            status: "failed",
            error: error
        })
    }
}

module.exports = {
    upload,
    updateByID
}