const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const Thread = require('../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class FindThreadByIdUseCase {
    /**
     *
     * @param {Object} dependencies - object containing dependencies
     * @param {ThreadRepository} dependencies.threadRepository - thread repository instance
     */
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    /**
     *
     * @param {string} id - id of thread
     * @returns {Promise<Thread>} - thread
     * @throws {NotFoundError} - if thread not found
     */
    async execute(id) {
        return this._threadRepository.findThreadById(id);
    }
}

module.exports = FindThreadByIdUseCase;
