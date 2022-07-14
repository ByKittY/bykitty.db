const greenMessage = (message) => `\x1b[32m${message}\x1b[0m`;
const redMessage = (errorMessage) => `\x1b[31m${errorMessage}\x1b[0m`;
const yellowMessage = (message) => `\x1b[33m${message}\x1b[0m`;

class DatabaseError extends Error {
get name() {
return redMessage(`[ChainDev] ${this.constructor.name}`);
}
}

module.exports = DatabaseError;