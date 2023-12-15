import express from 'express';
import GetInfo from './GetInfo.js';
import Login from './Login.js';
import GetAllTask from './GetAllTask.js';
import Upload from './upload.js';
// import upload from './upload.js';

const Route = express.Router();

Route
	.use('/GetInfo', GetInfo)
	.use('/GetAllTask', GetAllTask)
	.use('/Login', Login)
	.use('/Upload', Upload)
	.use('/', (req, res) => {
		res.status(200).json('Hello');
	});

export default Route;
