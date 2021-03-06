const InvariantError = require('../../../Commons/exceptions/InvariantError');

class Comment {
    /**
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.content
     * @param {Date} payload.date
     * @param {string} payload.username
     * @param {Date | null} payload.deleted_at
     * @param {string | null} payload.reply_to
     * @param {number} payload.likeCount
     * @param {Comment[] | undefined} payload.replies
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;

        if (payload.deleted_at && payload.reply_to) {
            this.content = '**balasan telah dihapus**';
        } else if (payload.deleted_at && !payload.reply_to) {
            this.content = '**komentar telah dihapus**';
        } else {
            this.content = payload.content;
        }
        this.likeCount = payload.likeCount ?? 0;
        this.date = new Date(payload.date);
        this.username = payload.username;
        if (payload?.replies && payload?.replies?.length > 0)
            this.replies = payload.replies.map(
                (value) => new Comment(value),
            );
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
