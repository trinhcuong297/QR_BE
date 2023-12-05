import express from 'express';
import mongoose from 'mongoose';
import { ArtemisImageSchema, Device_Owner } from '../configs/db_model_config.js';
import { db_Delete_Artemis, db_Import_Artemis } from '../configs/db_server_connect.js';
import multer from 'multer';
import sharp from 'sharp';
import * as fs from 'fs'
import * as path from 'path'
const Artemis = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '---' + Date.now())
    }
});

var upload = multer({ storage: storage });

Artemis
    .get('/showAll', async (req, res) => {
        try {
            const ArtemisData = mongoose.model("ArtemisData", ArtemisImageSchema)
            const ArtemisDataAll = await ArtemisData.find({})
            var imgArr = []
            ArtemisDataAll.map((e) => { return imgArr.push(e.imgFile.data.toString('base64')) })
            return res.status(200).json({ res: ArtemisDataAll, img: imgArr })
        } catch (err) {
            console.log(err);
            return res.status(500).json("Error 500")
        }
    })
    .get('/search/:room.:user', async (req, res) => {
        try {
            const ArtemisData = mongoose.model("ArtemisData", ArtemisImageSchema)
            console.log(req.params)
            let query = {}
            query = req.params.room != "*" ? { ...query, room: req.params.room } : { ...query }
            query = req.params.user != "*" ? { ...query, user: req.params.user } : { ...query }
            const ArtemisDataAll = await ArtemisData.find(query)
            var imgArr = []
            ArtemisDataAll.map((e) => { return imgArr.push(e?.imgFile?.data?.toString('base64')) })
            return res.status(200).json({ res: ArtemisDataAll, img: imgArr })
        } catch (err) {
            console.log(err);
            return res.status(500).json("Error 500")
        }
    })
    .post('/addPost', upload.array('imgFile'), async function (req, res, next) {
        try {
            let buffer = await sharp(req.file.path)
                .resize(200, 200, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
                })
                .toBuffer();
            await sharp(buffer).toFile(req.file.path);



            var obj = {
                room: req.body.room,
                user: req.body.user,
                note: req.body.note,
                imgFile: {
                    data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            const ArtemisData = mongoose.model("ArtemisData", ArtemisImageSchema)
            await db_Import_Artemis(ArtemisData, obj)
            return res.status(200).json("OK")
        }
        catch (err) {
            res.status(500).json("Error")
        }
    })
    .get('/removePost/:key', async (req, res) => {
        try {
            const ArtemisData = mongoose.model("ArtemisData", ArtemisImageSchema)
            const resp = await db_Delete_Artemis(ArtemisData, req.params.key)
            return res.status(200).json("OK")
        } catch (err) {
            console.log(err);
            return res.status(500).json("Error 500")
        }
    })

export default Artemis;
