const InvariantError = require('../../../Commons/exceptions/InvariantError');

class CreatedThread {
    /**
     *
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.title
     * @param {string} payload.owner
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;
        this.title = payload.title;
        this.owner = payload.owner;
    }

    /**
     *
     * @param {Object} payload
     * @param {string} payload.id
     * @param {string} payload.title
     * @param {string} payload.owner
     */
    _verifyPayload(payload) {
        if (!payload.id || !payload.title || !payload.owner) {
            throw new InvariantError(
                'CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof payload.id !== 'string' ||
            typeof payload.title !== 'string' ||
            typeof payload.owner !== 'string'
        ) {
            throw new InvariantError(
                'CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = CreatedThread;
