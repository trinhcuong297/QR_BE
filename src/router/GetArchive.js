import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const GetArchive = express.Router();

GetArchive
    .post('/', async (req, res) => {
        try {
            const userArchive = await odoo.searchRead(
                "customer.archive",
                [["user_id", "=", Number(req.body.id)], ['status', '=', 'store']]
                ,
                [
                    "id",
                    "inputTime",
                    "inputImage",
                    "status",
                    "desc"
                ]
                )
            return res.status(200).json(userArchive)
        }
        catch (err) {
            return res.status(404).json(err)
        }
    })


export default GetArchive