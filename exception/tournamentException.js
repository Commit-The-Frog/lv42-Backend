const Exception = require('./exception');

class VoteInsertError extends Exception {
	constructor(message) {
		super(message);
		this.name = 'VoteInsertError';
		this.status = 500;
		this.logger();
	}
};

class VoteAlreadyExist extends Exception {
	constructor(message) {
		super(message);
		this.name = 'VoteAlreadyExist';
		this.status = 400;
		this.logger();
	}
};

class GetVoteIdError extends Exception {
	constructor(message) {
		super(message);
		this.name = 'GetVoteIdError';
		this.status = 500;
		this.logger();
	}
};

class ParticipantIdNotExist extends Exception {
	constructor(message) {
		super(message);
		this.name = 'ParticipantIdNotExist';
		this.status = 400;
		this.logger();
	}
};

class GetAllParticipantsInfoError extends Exception {
	constructor(message) {
		super(message);
		this.name = 'GetAllParticipantsInfoError';
		this.status = 500;
		this.logger();
	}
};

module.exports = {
	VoteInsertError,
	VoteAlreadyExist,
	ParticipantIdNotExist,
	GetVoteIdError,
	GetAllParticipantsInfoError
};
