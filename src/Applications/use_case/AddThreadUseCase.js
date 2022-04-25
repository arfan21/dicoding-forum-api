const CreatedThread = require('../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
    /**
     *
     * @param {object} dependencies - object containing dependencies
     * @param {ThreadRepository} dependencies.threadRepository - thread repository instance
     */
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    /**
     *
     * @param {object} payload - payload for add thread use case
     * @param {string} payload.title - title of thread
     * @param {string} payload.body - body of thread
     * @param {string} payload.owner - owner of thread
     * @returns {Promise<CreatedThread>} - created thread
     */
    async execute(payload) {
        const newThread = new NewThread({
            title: payload.title,
            body: payload.body,
            owner: payload.owner,
        });

        const createdThread = await this._threadRepository.addThread(
            newThread,
        );

        return createdThread;
    }
}

module.exports = AddThreadUseCase;
