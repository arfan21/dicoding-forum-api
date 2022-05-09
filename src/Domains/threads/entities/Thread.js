const InvariantError = require('../../../Commons/exceptions/InvariantError');
const Comment = require('../../comments/entities/Comment');

class Thread {
    /**
     *
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.title
     * @param {string} payload.body
     * @param {Date} payload.date
     * @param {string} payload.username
     * @param {Comment[]} payload.comments
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;
        this.title = payload.title;
        this.body = payload.body;
        this.date = new Date(payload.date).toISOString();
        this.username = payload.username;
        this.comments =
            payload.comments.length > 0
                ? payload.comments.map((value) => new Comment(value))
                : [];
    }

    /**
     *
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.title
     * @param {string} payload.body
     * @param {Date} payload.date
     * @param {string} payload.username
     * @param {Comment[]} payload.comments
     */
    _verifyPayload(payload) {
        if (
            !payload.id ||
            !payload.title ||
            !payload.body ||
            !payload.date ||
            !payload.username ||
            !payload.comments
        ) {
            throw new InvariantError(
                'THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof payload.id !== 'string' ||
            typeof payload.title !== 'string' ||
            typeof payload.body !== 'string' ||
            !(payload.date instanceof Date) ||
            typeof payload.username !== 'string' ||
            !Array.isArray(payload.comments)
        ) {
            throw new InvariantError(
                'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = Thread;
