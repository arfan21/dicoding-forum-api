/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
    async addThread({
        id = 'thread-123',
        title = 'title',
        body = 'body',
        owner = 'user-123',
    }) {
        const query = {
            text: 'INSERT INTO threads (id, title, body, owner) VALUES($1, $2, $3, $4)',
            values: [id, title, body, owner],
        };

        await pool.query(query);
    },

    async findThreadById(id) {
        const query = {
            text: `SELECT threads.*, users.username,
            coalesce(json_agg(comments.*) filter (where comments.id is not null) , '[]') as comments 
        FROM threads JOIN users ON users.id = threads.owner 
        LEFT JOIN (
            SELECT comments.*, coalesce(json_agg(replies.*) filter (where replies.id is not null) , '[]')  as replies  FROM comments LEFT JOIN comments replies ON replies.reply_to = comments.id
            GROUP BY comments.id
        ) comments ON comments.thread = threads.id AND comments.reply_to IS NULL
        WHERE threads.id = $1  GROUP BY threads.id, users.username`,
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
    },
};

module.exports = ThreadsTableTestHelper;
