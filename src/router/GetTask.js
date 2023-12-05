import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const GetTask = express.Router();

GetTask
    .get('/:user', async (req, res) => {
        try {
            const allTask = await odoo.read(
                "project.task",
                [...Array(100).keys()].map(i => i + 1),
                ["project_analytic_account_id", "project_id", "portal_user_names", "description", "tag_ids", "name", "access_token"]
            )
            console.log(allTask)
            const allUser = await odoo.read("hr.employee", [...Array(100).keys()].map(i => i + 1), ["name", "work_email"])
            const User = await allUser.find((e) => { return e.work_email == req.params.user })
            const myTask = await allTask.filter((e) => { return e.portal_user_names.includes(User?.name) })

            return res.status(200).json(myTask)
        }
        catch {
            return res.status(404).json()
        }
    })


export default GetTask