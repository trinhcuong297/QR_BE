import mongoose from 'mongoose';

const Device_Model = new mongoose.Schema({
	data: Object | String,
});
const User = new mongoose.Schema({
	ID: String,
	username: String,
	password: String,
	name: String,
})

const Device_Owner = new mongoose.Schema({
	username: String,
	name: String,
	friendly_name: String,
	ieee_address: String,
	device_type_id: String,
})

const ArtemisImageSchema = new mongoose.Schema({
	room: String,
	user: String,
	note: String,
	imgFile:
	{
		data: Buffer,
		contentType: String
	}
});

export { Device_Model, User, Device_Owner, ArtemisImageSchema };
