const CommentRepository = require('../../Domains/comments/CommentRepository');

class DeleteCommentUseCase {
    /**
     *
     * @param {Object} dependencies - dependencies of use case
     * @param {CommentRepository} dependencies.commentRepository - comment repository
     */
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     * @throws {NotFoundError}
     */
    async execute(id) {
        await this._commentRepository.deleteComment(id);
    }
}

module.exports = DeleteCommentUseCase;
