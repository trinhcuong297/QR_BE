import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const GetInfo = express.Router();

GetInfo
    .get('/:user', async (req, res) => {
        try {
            const allArchive = await odoo.searchRead("customer.archive", [], ['id', 'name', 'homeLocation', 'project', 'phone', 'user_id'])
            const allBill = await odoo.searchRead("customer.bill", [], ['type', 'id', 'total', 'status', 'user_id'])
            console.log(allArchive, allBill)

            return res.status(200).json(myTask)
        }
        catch {
            return res.status(404).json()
        }
    })


export default GetInfo