const { User } = require('../config/mongodbConfig');
const Exception = require('../exception/exception');
var userException = require('../exception/userException');
var logger = require('../config/logger');

// CREATE user
const addUser = async function (userId, name, profileImg) {
	try {
		const result = await User.create({
			user_id : userId,
			name : name,
			profile_img : profileImg
		});
		logger.info(`### added user to DB : [${result.name}, ${result._id}]`);
		return result;
	} catch (error) {
		if (error.code === 11000)
			throw new userException.UserNameDuplicateError("from repository");
		else
			throw new Exception("from repository");
	}
};

// FIND user by id
const findUserById = async function (userId) {
	try {
		const result = await User.findOne({ user_id : userId });
		if (result === null)
			throw Error();
		logger.info(`### user searched from DB : [${result.name}, ${result.user_id}]`)
		return result;
	} catch (error) {
		throw new userException.UserNotFoundError("from repository");
	}
}

// FIND all users
const findAllUsers = function () {
	try {
		logger.info('### all user searched from DB')
		return User.find({});
	} catch (error) {
		throw error;
	}
}

const findUserNamesByRegex = async function (regex) {
	try {
		logger.info('### find user by regex from DB');
		return await User.find({name: {$regex: regex}}).select('name');
	} catch (error) {
		throw new userException.UserNotFoundError("from repository");
	}
}

const findUserByName = async function (name) {
	try {
		logger.info('### find user by regex from DB');
		return await User.findOne({name: name});
	} catch (error) {
		throw new userException.UserNotFoundError("from repository");
	}
}

/* UPDATE user by id
	: [_id] field must not be changed */
const updateUserById = async function (userId, name, profileImg) {
	try {
		const filter = { user_id : userId };
		const update = {
			name : name,
			profile_img : profileImg
		}
		var user = await User.findOne({ user_id : userId });
		await User.updateOne(filter, update);
		user = await User.findOne({ user_id : userId });
		logger.info(`### user updated from DB : [${user.name}, ${user.user_id}]`);
		return user;
	} catch (error) {
		throw new userException.UserNotFoundError("from repository");
	}
}

// DELETE user by id
const deleteUserById = async function (userId) {
	try {
		var user = await User.findOne({ user_id : userId });
		await User.deleteOne({ user_id : userId });
		logger.info(`### user deleted from DB : [${user.name}, ${user.user_id}]`);
		return user;
	} catch (error) {
		throw new userException.UserNotFoundError("from repository");
	}
}

module.exports = {
	addUser,
	findUserById,
	findAllUsers,
	updateUserById,
	deleteUserById,
	findUserNamesByRegex,
	findUserByName
};
