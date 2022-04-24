const CreatedThread = require('./entities/CreatedThread');
const NewThread = require('./entities/NewThread');
const Thread = require('./entities/Thread');

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
     */
    async findThreadById(id) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = ThreadRepository;
