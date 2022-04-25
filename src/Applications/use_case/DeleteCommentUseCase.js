const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const CommentRepository = require('../../Domains/comments/CommentRepository');

class DeleteCommentUseCase {
    /**
     *
     * @param {Object} dependencies - dependencies of use case
     * @param {CommentRepository} dependencies.commentRepository - comment repository
     * @param {ThreadRepository} dependencies.threadRepository - thread repository
     */
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     * @throws {NotFoundError}
     * @throws {AuthorizationError}
     */
    async execute(id, owner) {
        const result =
            await this._commentRepository.verifyCommentExists(id);
        if (result.owner !== owner) {
            throw new AuthorizationError('anda tidak memiliki akses');
        }
        await this._threadRepository.verifyThreadExists(
            result.thread,
        );
        await this._commentRepository.deleteComment(id);
    }
}

module.exports = DeleteCommentUseCase;
