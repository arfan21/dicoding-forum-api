const { Pool } = require('pg');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CreatedThread = require('../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../Domains/threads/entities/NewThread');
const Thread = require('../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
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
     * @param {NewThread} thread
     * @returns {Promise<CreatedThread>} createdThread
     */
    async addThread(newThread) {
        const id = `thread-${this._idGenerator()}`;
        const { title, body, owner } = newThread;
        const query = {
            text: 'INSERT INTO threads (id, title, body, owner) VALUES($1, $2, $3, $4) RETURNING id, title, owner',
            values: [id, title, body, owner],
        };

        const result = await this._pool.query(query);

        return new CreatedThread({ ...result.rows[0] });
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<Thread>} thread
     * @throws {NotFoundError} if thread is not found
     */
    async findThreadById(id) {
        const queryJoinReply = `
            SELECT comments.*,
                (SELECT COUNT(*) FROM likes WHERE likes.comment = comments.id) AS "likeCount", 
                users.username FROM comments 
                JOIN users ON users.id = comments.owner
            WHERE comments.reply_to IS NOT NULL ORDER BY comments.date ASC
        `;

        const queryJoinComment = `
            SELECT comments.*,
                (SELECT COUNT(*) FROM likes WHERE likes.comment = comments.id) AS "likeCount",
                coalesce(json_agg(replies.* ORDER BY replies.date ASC) filter (where replies.id is not null) , '[]')  as replies, users.username  
                FROM comments 
                JOIN users ON users.id = comments.owner
                LEFT JOIN (
                    ${queryJoinReply}
                ) replies ON replies.reply_to = comments.id
            GROUP BY comments.id, users.username ORDER BY comments.date ASC
        `;

        const query = {
            text: `
                SELECT threads.*, users.username,
                    coalesce(json_agg(comments.* ORDER BY comments.date ASC) filter (where comments.id is not null) , '[]') as comments 
                FROM threads JOIN users ON users.id = threads.owner 
                LEFT JOIN (
                    ${queryJoinComment}
                ) comments ON comments.thread = threads.id AND comments.reply_to IS NULL
                WHERE threads.id = $1 GROUP BY threads.id, users.username `,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('thread tidak ditemukan');
        }

        const payload = result.rows[0];
        return new Thread(payload);
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     * @throws {NotFoundError} if thread is not found
     */
    async verifyThreadExists(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('thread tidak ditemukan');
        }
    }
}

module.exports = ThreadRepositoryPostgres;
