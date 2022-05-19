/* eslint-disable no-unused-vars */
const NewLike = require('./entities/NewLike');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class LikeRepository {
    /**
     *
     * @param {NewLike} like
     * @returns {Promise<string>}
     */
    async addLike(like) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     * @param {string} thread
     * @param {string} owner
     * @param {string} comment
     * @returns {Promise<string>}
     * @throws {NotFoundError} if thread is not found
     */
    async checkExistsLike(thread, owner, comment) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     *
     * @param {string} likeId
     * @returns {Promise<void>}
     */
    async removeLike(likeId) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = LikeRepository;
