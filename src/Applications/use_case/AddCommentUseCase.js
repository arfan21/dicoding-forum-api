const CommentRepository = require('../../Domains/comments/CommentRepository');
const CreatedComment = require('../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
    /**
     *
     * @param {Object} dependencies - dependencies of use case
     * @param {CommentRepository} dependencies.commentRepository - comment repository
     */
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    /**
     * @param {Object} payload
     * @param {string} payload.thread
     * @param {string} payload.content
     * @param {string} payload.owner
     * @returns {Promise<CreatedComment>} createdComment
     */
    async execute(payload) {
        const newComment = new NewComment({
            content: payload.content,
            owner: payload.owner,
            thread: payload.thread,
        });

        const createdComment =
            await this._commentRepository.addComment(newComment);

        return createdComment;
    }
}

module.exports = AddCommentUseCase;
