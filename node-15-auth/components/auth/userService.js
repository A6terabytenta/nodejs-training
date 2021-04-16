const User =  require('./user');
const UsersErrors =  require('./userErrors');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const saltRounds = 10;

async function hashPassword(plaintextPassword) {
	return await bcrypt.hash(plaintextPassword, saltRounds);
}

async function findById(userId) {
	const user = await User.findById(userId);
	if (!user) {
		throw Boom.badRequest(UsersErrors.NOT_FOUND);
	}
	return user;
}

exports.findByUsername = async (username) => {
	const query  = User.where({ username: username});
	return await User.findOne(query).catch(e => {
		throw Boom.badRequest(e.message);
	});
}

exports.findById = async (userId) => {
	return findById(userId);
}

exports.find = async () => {
	return await User.find({}).catch(e => {
		throw Boom.badRequest(e.message);
	});
}

exports.save = async (userId, payload) => {

	var userData = new User();
	if (userId) {
		userData = await findById(userId);
	}

	userData.username = payload.username;
	userData.password = await hashPassword(payload.password);
	userData.scope = payload.scope;

	await userData.save().catch(e => {
		throw Boom.badRequest(e.message);
	});
	
	return userData;
}

exports.delete = async (userId) => {
	await (await findById(userId)).deleteOne();
	return {success: true};
}