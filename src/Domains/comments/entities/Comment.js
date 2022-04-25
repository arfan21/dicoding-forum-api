const InvariantError = require('../../../Commons/exceptions/InvariantError');

class Comment {
    /**
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.content
     * @param {Date} payload.date
     * @param {string} payload.username
     * @param {Comment[] | undefined} payload.replies
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;
        this.content = payload.content;
        this.date = new Date(payload.date);
        this.username = payload.username;
        if (payload?.replies && payload?.replies?.length > 0)
            this.replies = payload.replies.map((value) => {
                return new Comment({
                    ...value,
                });
            });
    }

    /**
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.content
     * @param {Date} payload.date
     * @param {string} payload.username
     * @param {Comment[] | undefined} payload.replies
     */
    _verifyPayload(payload) {
        if (
            !payload.id ||
            !payload.content ||
            !payload.date ||
            !payload.username
        ) {
            throw new InvariantError(
                'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof payload.id !== 'string' ||
            typeof payload.content !== 'string' ||
            !payload instanceof Date ||
            typeof payload.username !== 'string'
        ) {
            throw new InvariantError(
                'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }

        if (payload.replies && !Array.isArray(payload.replies)) {
            throw new InvariantError(
                'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = Comment;
