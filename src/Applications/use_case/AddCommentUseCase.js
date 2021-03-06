const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CreatedComment = require('../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../Domains/comments/entities/NewComment');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class AddCommentUseCase {
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
     * @param {Object} payload
     * @param {string} payload.thread
     * @param {string} payload.content
     * @param {string} payload.owner
     * @param {string | null} payload.reply_to
     * @returns {Promise<CreatedComment>} createdComment
     * @throws {NotFoundError}
     */
    async execute(payload) {
        const newComment = new NewComment({
            content: payload.content,
            owner: payload.owner,
            thread: payload.thread,
            reply_to: payload.reply_to,
        });

        if (payload.reply_to) {
            await this._commentRepository.verifyCommentExists(
                payload.reply_to,
            );
        }

        await this._threadRepository.verifyThreadExists(
            payload.thread,
        );

        const createdComment =
            await this._commentRepository.addComment(newComment);

        return createdComment;
    }
}

module.exports = AddCommentUseCase;
