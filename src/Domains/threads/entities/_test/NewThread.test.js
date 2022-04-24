const NewThread = require("../NewThread");

describe("NewThread entities", () => {
    it("should throw error when payload not contain needed property", () => {
        // Arrange
        const payload = {
            title: "title",
            body: "body",
        };

        // Action & Assert
        expect(() => new NewThread(payload)).toThrowError(
            "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });

    it("should throw error when payload not meet data type specification", () => {
        // Arrange
        const payload = {
            title: "title",
            body: 1234,
            owner: "owner",
        };

        // Action & Assert
        expect(() => new NewThread(payload)).toThrowError(
            "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });

    it("should create newThread object correctly", () => {
        // Arrange
        const payload = {
            title: "title",
            body: "body",
            owner: "owner",
        };

        // Action
        const { title, body, owner } = new NewThread(payload);

        // Assert
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
        expect(owner).toEqual(payload.owner);
    });
});
