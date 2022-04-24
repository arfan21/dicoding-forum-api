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
     * @param {NewComment} comment
     * @returns {Promise<CreatedComment>} createdComment
     */
    async addReply(comment) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     */
    async deleteComment(id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = CommentRepository;
