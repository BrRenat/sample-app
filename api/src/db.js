const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://195.62.70.104:27017/admin';

const initMongoDB = async () => {
	try {
		const db = await MongoClient.connect(MONGO_URL);
		await db.authenticate('admin', 'Hg98t3Nsj');

		return db;
	} catch (e) {
		throw e;
	}
};

module.exports = initMongoDB;
