/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
    addLike: async ({
        id = 'like-123',
        thread = 'thread-123',
        owner = 'user-123',
        comment = 'comment-123',
    }) => {
        const query = {
            text: 'INSERT INTO likes (id, thread, owner, comment) VALUES($1, $2, $3, $4)',
            values: [id, thread, owner, comment],
        };

        await pool.query(query);
    },

    findLikeById: async (id) => {
        const query = {
            text: 'SELECT * FROM likes WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    cleanTable: async () => {
        await pool.query('DELETE FROM likes WHERE 1=1');
    },
};

module.exports = LikesTableTestHelper;
