/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("comments", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        content: {
            type: "TEXT",
            notNull: true,
        },
        owner: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        thread: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        reply_to: {
            type: "VARCHAR(50)",
            notNull: false,
        },
        date: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        deleted_at: {
            type: "TIMESTAMP",
            notNull: false,
        },
    });

    pgm.addConstraint(
        "comments",
        "fk_comments.owner_users.id",
        "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
    );
    pgm.addConstraint(
        "comments",
        "fk_comments.thread_threads.id",
        "FOREIGN KEY(thread) REFERENCES threads(id) ON DELETE CASCADE"
    );
    pgm.addConstraint(
        "comments",
        "fk_comments.reply_to_comments.id",
        "FOREIGN KEY(reply_to) REFERENCES comments(id) ON DELETE CASCADE"
    );
};

exports.down = (pgm) => {
    pgm.dropTable("comments");
};
