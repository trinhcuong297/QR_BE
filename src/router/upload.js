import multer from "multer";
import express from "express";
import * as fs from 'fs'
import * as path from 'path'
import odoo from "../configs/odoo_config.js";
import { fileURLToPath } from "url";
import { error } from "console";
const Upload = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname )
    }
});

const multi_upload = multer({
    storage
})


Upload
    .post('/',
        (req, res, next) => {
            // Use multer upload instance
            multi_upload.array('imgFiles', 2)(req, res, (err) => {
                if (err) {
                    console.log(err)
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
                    console.log(error)
                    return res.status(400).json({ errors });
                }

                // Attach files to the request object
                req.files = files;

                // Proceed to the next middleware or route handler
                console.log(req.files)
                next();
            });
        }
        , async function (req, res, next) {
            try {
                await odoo.create("customer.error", {
                    user_id: Number(req.body.user_id),
                    errLocation: req.body.errLocation,
                    desc: req.body.desc,
                    imgURL: `<a href="${req.files.map((e) => "https://vvcqr.io.vn/"+e.path.slice(8))}">Xem</a>`,
                    status: "err"
                })
                return res.status(200).json("OK")
            }
            catch (err) {
                console.log(err)
                res.status(500).json(err)
            }
        })


export default Upload