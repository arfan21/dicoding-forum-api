const { Pool } = require('pg');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const NewLike = require('../../Domains/likes/entities/NewLike');
const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
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
     * @param {NewLike} like
     * @returns {Promise<string>}
     */
    async addLike(like) {
        const id = `like-${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO likes (id, owner, thread, comment) VALUES($1, $2, $3, $4) RETURNING id, owner, thread, comment',
            values: [id, like.owner, like.thread, like.comment],
        };

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    /**
     * @param {string} thread
     * @param {string} owner
     * @param {string} comment
     * @returns {Promise<string>}
     * @throws {NotFoundError} if thread is not found
     */
    async checkExistsLike(thread, owner, comment) {
        const query = {
            text: 'SELECT * FROM likes WHERE thread = $1 AND owner = $2 AND comment = $3',
            values: [thread, owner, comment],
        };

        const result = await this._pool.query(query);

        if (result.rowCount === 0) {
            throw new NotFoundError('LIKE_REPOSITORY.LIKE_NOT_FOUND');
        }

        return result.rows[0].id;
    }

    /**
     *
     * @param {string} likeId
     * @returns {Promise<void>}
     */
    async removeLike(likeId) {
        const query = {
            text: 'DELETE FROM likes WHERE id = $1',
            values: [likeId],
        };

        const result = await this._pool.query(query);

        if (result.rowCount === 0) {
            throw new NotFoundError('LIKE_REPOSITORY.LIKE_NOT_FOUND');
        }
    }
}

module.exports = LikeRepositoryPostgres;
