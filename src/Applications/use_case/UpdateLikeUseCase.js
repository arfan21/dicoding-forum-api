const NewLike = require('../../Domains/likes/entities/NewLike');
const LikeRepository = require('../../Domains/likes/LikeRepository');

class UpdateLikeUseCase {
    /**
     *
     * @param {Object} dependencies - dependencies of use case
     * @param {LikeRepository} dependencies.likeRepository - comment repository
     * @param {ThreadRepository} dependencies.threadRepository - thread repository
     * @param {CommentRepository} dependencies.commentRepository - comment repository
     */
    constructor({
        likeRepository,
        commentRepository,
        threadRepository,
    }) {
        this._likeRepository = likeRepository;
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    /**
     * @param {Object} payload
     * @param {string} payload.thread
     * @param {string} payload.comment
     * @param {string} payload.owner
     * @returns {Promise<string>} id like
     */
    async execute(payload) {
        const { thread, comment, owner } = payload;
        await this._commentRepository.verifyCommentExists(comment);
        await this._threadRepository.verifyThreadExists(thread);

        try {
            const idLike = await this._likeRepository.checkExistsLike(
                thread,
                owner,
                comment,
            );
            return this._likeRepository.removeLike(idLike);
        } catch (error) {
            return this._likeRepository.addLike(new NewLike(payload));
        }
    }
}

module.exports = UpdateLikeUseCase;
