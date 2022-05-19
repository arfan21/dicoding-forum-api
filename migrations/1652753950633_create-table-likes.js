/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('likes', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        thread: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        comment: {
            type: 'VARCHAR(50)',
            notNull: false,
        },
        date: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addConstraint(
        'likes',
        'fk_likes.owner_users.id',
        'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
    );
    pgm.addConstraint(
        'likes',
        'fk_likes.thread_threads.id',
        'FOREIGN KEY(thread) REFERENCES threads(id) ON DELETE CASCADE',
    );
    pgm.addConstraint(
        'likes',
        'fk_likes.comment_comments.id',
        'FOREIGN KEY(comment) REFERENCES comments(id) ON DELETE CASCADE',
    );
};

exports.down = (pgm) => {
    pgm.dropTable('likes');
};
