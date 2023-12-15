import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const Login = express.Router();

Login
    .post('/', async (req, res) => {
        try {
            console.log(req.body)
            const User = await odoo.searchRead("customer.account", ["&", ['email', '=', req.body.email], ['password', '=', req.body.password]])
            return res.status(200).json(User)
        }
        catch {
            return res.status(404).json("")
        }
    })

export default Login