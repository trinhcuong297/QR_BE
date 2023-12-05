import express from 'express';
import GetTask from './GetTask.js';
import Login from './Login.js';
import GetAllTask from './GetAllTask.js';
import Upload from './upload.js';
// import upload from './upload.js';

const Route = express.Router();

Route
	.use('/GetTask', GetTask)
	.use('/GetAllTask', GetAllTask)
	.use('/Login', Login)
	.use('/Upload', Upload)
	.use('/', (req, res) => {
		res.status(200).json('Hello');
	});

export default Route;
