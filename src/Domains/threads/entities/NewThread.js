class NewThread {
    /**
     *
     * @param {Object} payload
     * @param {string} payload.title
     * @param {string} payload.body
     * @param {string} payload.owner
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.title = payload.title;
        this.body = payload.body;
        this.owner = payload.owner;
    }

    /**
     *
     * @param {Object} payload
     * @param {string} payload.title
     * @param {string} payload.body
     * @param {string} payload.owner
     */
    _verifyPayload(payload) {
        if (!payload.title || !payload.body || !payload.owner) {
            throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (
            typeof payload.title !== 'string' ||
            typeof payload.body !== 'string' ||
            typeof payload.owner !== 'string'
        ) {
            throw new Error(
                'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = NewThread;
