class CreatedComment {
    /**
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.content
     * @param {string} payload.owner
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;
        this.content = payload.content;
        this.owner = payload.owner;
    }

    /**
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.content
     * @param {string} payload.owner
     */
    _verifyPayload(payload) {
        if (!payload.id || !payload.content || !payload.owner) {
            throw new Error(
                'CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof payload.id !== 'string' ||
            typeof payload.content !== 'string' ||
            typeof payload.owner !== 'string'
        ) {
            throw new Error(
                'CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = CreatedComment;
