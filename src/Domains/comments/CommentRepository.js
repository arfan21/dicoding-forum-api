/* eslint-disable no-unused-vars */
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const Comment = require('./entities/Comment');
const CreatedComment = require('./entities/CreatedComment');
const NewComment = require('./entities/NewComment');

class CommentRepository {
    /**
     *
     * @param {NewComment} comment
     * @returns {Promise<CreatedComment>} createdComment
     */
    async addComment(comment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     */
    async deleteComment(id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     * @typedef {Object} Comment
     * @property {string} id
     * @property {string} content
     * @property {string} owner
     * @property {string} thread
     * @property {string} reply_to
     * @property {Date} deleted_at
     * @property {Date} date
     */
    /**
     * @param {string} id
     * @returns {Promise<Comment>}
     * @throws {NotFoundError} if comment is not found
     */
    async verifyCommentExists(id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = CommentRepository;
