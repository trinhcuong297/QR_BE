import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const Login = express.Router();

Login
    .post('/', async (req, res) => {
        try {
            const allUser = await odoo.read("hr.employee", [...Array(100).keys()].map(i => i + 1), ["name", "work_email"])
            const User = allUser.find((e) => e.work_email == req.body.email)
            return res.status(200).json(User ? User : 0)
        }
        catch {
            return res.status(404).json("")
        }
    })

export default Login