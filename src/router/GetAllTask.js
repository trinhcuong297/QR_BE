import express from 'express';
import mongoose from 'mongoose';
import odoo from '../configs/odoo_config.js';

const GetAllTask = express.Router();

GetAllTask
    .get('/v23nabfkanxl5234aw654mbafhasdhf452343bwebfsajdchasdcre', async (req, res) => {
        try {
            const allTask = await odoo.read(
                "project.task",
                [...Array(100).keys()].map(i => i + 1),
                ["access_token", "name", "project_id"]
            )
            const myTask = allTask

            return res.status(200).json(myTask)
        }
        catch {
            return res.status(500).json("Server Error")
        }
    })


export default GetAllTask