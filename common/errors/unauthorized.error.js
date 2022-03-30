class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = UnauthorizedError;