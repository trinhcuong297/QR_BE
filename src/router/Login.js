import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const Login = express.Router();

Login
    .post('/', async (req, res) => {
        try {
            const User = await odoo.searchRead(
                "customer.account",
                {
                    id: Number(req.body.id),
                    password: req.body.password,
                },
                [
                    "id",
                    "name",
                    "birthday",
                    "phone",
                    "email",
                    "gender",
                    "IDCard",
                    "studyLevel",
                    "job",
                    "elevatorCard",
                    "isCompany",
                    "archiveCount",
                    "billCount",
                    "errorCount",
                    "ground_ids",
                    "building",
                    "block"
                ]
            )
            return res.status(200).json(User)
        }
        catch {
            return res.status(404).json("")
        }
    })

export default Login