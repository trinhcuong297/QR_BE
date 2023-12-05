import mongoose from 'mongoose';

async function db_Connect() {
	try {
		// await mongoose.connect('mongodb://127.0.0.1:27017/Test');
		await mongoose.connect('mongodb+srv://trinhcuong297:caocuong297@cluster0.ob0weth.mongodb.net/?retryWrites=true&w=majority/test');
	} catch (err) {
		console.log(err);
	}
}

async function db_Import(Model, Save_Data) {
	try {
		const Save_To_Db = new Model({ data: Save_Data });
		await Save_To_Db.save();
	} catch (err) {
		console.log(err);
	}
}

async function db_Import_Artemis(Model, Save_Data) {
	try {
		const Save_To_Db = new Model(Save_Data);
		await Save_To_Db.save();
	} catch (err) {
		console.log(err);
	}
}

async function db_Import_User(Model, Save_Data) {
	try {
		const Save_To_Db = new Model({ username: Save_Data.username, password: Save_Data.password, name: Save_Data.name });
		await Save_To_Db.save();
		return 1
	} catch (err) {
		console.log(err);
		return 0
	}
}

async function db_Add_Device(Model, Save_Data) {
	try {
		const exist = await Model.find(
			{
				ieee_address: Save_Data.ieee_address
			}
		);
		console.log(exist)
		if (exist.length == 0) {
			const Save_To_Db = new Model(
				{
					username: Save_Data.username,
					name: Save_Data.name,
					friendly_name: Save_Data.friendly_name,
					ieee_address: Save_Data.ieee_address,
					device_type_id: Save_Data.device_type_id,
				}
			);
			await Save_To_Db.save();
			return 1
		}
		return 0
	} catch (err) {
		console.log(err);
	}
}

async function db_Delete_Device(Model, Save_Data) {
	try {
		await Model.deleteMany({ friendly_name: Save_Data.friendly_name });
		return 1
	} catch (err) {
		console.log(err);
		return 0
	}
}

async function db_Delete_Artemis(Model, Save_Data) {
	try {
		await Model.deleteMany({ _id: Save_Data });
		return 1
	} catch (err) {
		console.log(err);
		return 0
	}
}

async function db_Reset_Device(Model, Save_Data) {
	try {
		await Model.delete({ device: Save_Data.device });
	} catch (err) {
		console.log(err);
	}
}

async function db_Query(Model) {
	try {
		return await Model.find();
	} catch (err) {
		console.log(err);
	}
}

export { db_Connect, db_Import, db_Import_Artemis, db_Import_User, db_Query, db_Add_Device, db_Delete_Device, db_Reset_Device, db_Delete_Artemis };
