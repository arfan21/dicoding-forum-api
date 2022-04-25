const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const Comment = require('../../Domains/comments/entities/Comment');
const CreatedComment = require('../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../Domains/comments/entities/NewComment');

class CommentRepositoryPostgres extends CommentRepository {
    /**
     *
     * @param {Pool} pool
     * @param {() => string} idGenerator
     */
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    /**
     *
     * @param {NewComment} comment
     * @returns {Promise<CreatedComment>} createdComment
     */
    async addComment(comment) {
        const id = `${
            comment.reply_to ? 'reply' : 'comment'
        }-${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO comments (id, content, owner, thread, reply_to, deleted_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
            values: [
                id,
                comment.content,
                comment.owner,
                comment.thread,
                comment.reply_to,
                null,
            ],
        };

        const result = await this._pool.query(query);

        return new CreatedComment({ ...result.rows[0] });
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     */
    async deleteComment(id) {
        const query = {
            text: 'UPDATE comments SET deleted_at = NOW() WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (result.rows.length === 0) {
            throw new NotFoundError('komen tidak ditemukan');
        }
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
        const query = {
            text: 'SELECT * FROM comments J WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('komentar tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = CommentRepositoryPostgres;
