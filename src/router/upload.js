import multer from "multer";
import express from "express";
import * as fs from 'fs'
import * as path from 'path'
import odoo from "../configs/odoo_config.js";
const Upload = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '---' + Date.now())
    }
});

const multi_upload = multer({
    storage
})


Upload
    .post('/',
        (req, res, next) => {
            // console.log(req.body)
            // Use multer upload instance
            multi_upload.array('imgFiles', 5)(req, res, (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                // Retrieve uploaded files
                const files = req.files;
                const errors = [];

                // Validate file types and sizes
                files.forEach((file) => {
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    const maxSize = 5 * 1024 * 1024; // 5MB

                    if (!allowedTypes.includes(file.mimetype)) {
                        errors.push(`Invalid file type: ${file.originalname}`);
                    }

                    if (file.size > maxSize) {
                        errors.push(`File too large: ${file.originalname}`);
                    }
                });

                // Handle validation errors
                if (errors.length > 0) {
                    // Remove uploaded files
                    files.forEach((file) => {
                        fs.unlinkSync(file.path);
                    });

                    return res.status(400).json({ errors });
                }

                // Attach files to the request object
                req.files = files;

                // Proceed to the next middleware or route handler
                next();
            });
        }
        , async function (req, res, next) {
            try {
                await odoo.create("account.analytic.line", {
                    // date: `${new Date().toISOString().slice(0, 10)}`,
                    employee_id: Number(req.body.user_id),
                    unit_amount: 1,
                    project_id: Number(req.body.project_id),
                    date: `${new Date().toISOString().slice(0, 10)}`,
                    name: `${req.body.task} := ${req.body.error ? "ERROR" + req.body.error : ""} ______ ${req.files.map((e) => e.path).join("______")} ======== Time submit:${new Date().toISOString()}`
                })
                return res.status(200).json("OK")
            }
            catch (err) {
                res.status(500).json(err)
            }
        })


export default Upload