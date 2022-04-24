class CreatedThread {
    constructor(payload) {
        this._verifyPayload(payload);
        this.id = payload.id;
        this.title = payload.title;
        this.owner = payload.owner;
    }

    _verifyPayload(payload) {
        if (!payload.id || !payload.title || !payload.owner) {
            throw new Error("CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
        }

        if (
            typeof payload.id !== "string" ||
            typeof payload.title !== "string" ||
            typeof payload.owner !== "string"
        ) {
            throw new Error("CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
    }
}

module.exports = CreatedThread;
