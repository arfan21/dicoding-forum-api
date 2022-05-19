/* eslint-disable camelcase */
/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
    async addComment({
        id = 'comment-123',
        content = 'content',
        owner = 'user-123',
        thread = 'thread-123',
        reply_to = null,
        deleted_at = null,
    }) {
        const query = {
            text: 'INSERT INTO comments (id, content, owner, thread, reply_to, deleted_at) VALUES($1, $2, $3, $4, $5, $6)',
            values: [
                id,
                content,
                owner,
                thread,
                reply_to,
                deleted_at,
            ],
        };

        await pool.query(query);
    },

    async findCommentById(id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
};

module.exports = CommentsTableTestHelper;
