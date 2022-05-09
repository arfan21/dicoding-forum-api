const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

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
        const { owner: ownerFromDb } = result;
        // verify parent comment
        if (result.reply_to) {
            await this._commentRepository.verifyCommentExists(
                result.reply_to,
            );
        }

        this._validateOwner(ownerFromDb, owner);

        await this._threadRepository.verifyThreadExists(
            result.thread,
        );
        await this._commentRepository.deleteComment(id);
    }

    _validateOwner(ownerFromDb, owner) {
        if (ownerFromDb !== owner) {
            throw new AuthorizationError('anda tidak memiliki akses');
        }
    }
}

module.exports = DeleteCommentUseCase;
