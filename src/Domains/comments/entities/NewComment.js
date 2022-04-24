class NewComment {
    /**
     * @param {Object} payload
     * @param {string} payload.content
     * @param {string} payload.owner
     * @param {string} payload.thread
     * @param {string | null} payload.reply_to
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.content = payload.content;
        this.owner = payload.owner;
        this.thread = payload.thread;
        if (payload.reply_to) this.reply_to = payload.reply_to;
    }

    /**
     * @param {Object} payload
     * @param {string} payload.content
     * @param {string} payload.owner
     * @param {string} payload.thread
     * @param {string | null} payload.reply_to
     */
    _verifyPayload(payload) {
        if (!payload.content || !payload.owner || !payload.thread) {
            throw new Error(
                'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof payload.content !== 'string' ||
            typeof payload.owner !== 'string' ||
            typeof payload.thread !== 'string'
        ) {
            throw new Error(
                'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }

        if (
            payload.reply_to &&
            typeof payload.reply_to !== 'string'
        ) {
            throw new Error(
                'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = NewComment;
