const InvariantError = require('../../../Commons/exceptions/InvariantError');

class NewLike {
    /** *
     * @param {object} payload
     * @param {string} payload.thread
     * @param {string} payload.owner
     * @param {string} payload.comment
     */
    constructor(payload) {
        this._verifyPayload(payload);
        this.thread = payload.thread;
        this.owner = payload.owner;
        this.comment = payload.comment;
    }

    _verifyPayload(payload) {
        if (!payload.thread || !payload.owner || !payload.comment) {
            throw new InvariantError(
                'NEW_LIKE.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }
        if (
            typeof payload.thread !== 'string' ||
            typeof payload.owner !== 'string' ||
            typeof payload.comment !== 'string'
        ) {
            throw new InvariantError(
                'NEW_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

module.exports = NewLike;
