/**
 * @module app.lib.error
 *
 * @author Austin Bieber
 *
 * @description Implements HTTP specific errors
 */

class HTTPError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}

class BadRequestError extends HTTPError {
	constructor(message) {
		super(message, 400);
	}
}

class UnauthorizedError extends HTTPError {
	constructor(message) {
		super(message, 401);
	}
}

class ForbiddenError extends HTTPError {
	constructor(message) {
		super(message, 403);
	}
}

class NotFoundError extends HTTPError {
	constructor(message) {
		super(message, 404);
	}
}

class ConflictError extends HTTPError {
	constructor(message) {
		super(message, 409);
	}
}

class InternalServerError extends HTTPError {
	constructor(message) {
		super(message, 500);
	}
}

module.exports = {
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	InternalServerError
};