const CreatedThread = require('./entities/CreatedThread');
const NewThread = require('./entities/NewThread');
const Thread = require('./entities/Thread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepository {
    /**
     *
     * @param {NewThread} thread
     * @returns {Promise<CreatedThread>} createdThread
     */
    async addThread(thread) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<Thread>} thread
     * @throws {NotFoundError} if thread not found
     */
    async findThreadById(id) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     *
     * @param {string} id - thread id
     * @returns {Promise<void>}
     * @throws {NotFoundError} if thread not found
     */
    async verifyThreadExists(id) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = ThreadRepository;
