const Comment = require('../Comment');

describe('Comment entities', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            username: 'username',
        };

        // Action & Assert
        expect(() => new Comment(payload)).toThrowError(
            'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 1234,
            date: new Date(),
            username: 1234,
            replies: [],
        };

        // Action & Assert
        expect(() => new Comment(payload)).toThrowError(
            'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create Comment object correctly without replies', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: [],
        };

        // Action
        const { id, content, date, username, replies } = new Comment(
            payload,
        );

        // Assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(date).toEqual(payload.date);
        expect(username).toEqual(payload.username);
        expect(replies).toBeUndefined();
    });

    it('should missing key replies when replies null', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: null,
        };

        // Action
        const { replies } = new Comment(payload);

        // Assert
        expect(replies).toBeUndefined();
    });

    it('should missing key replies when replies empty array', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: [],
        };

        // Action
        const { replies } = new Comment(payload);

        // Assert
        expect(replies).toBeUndefined();
    });

    it('should throw error when replies not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: 123,
        };

        // Action & Assert
        expect(() => new Comment(payload)).toThrowError(
            'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create Comment object correctly with replies', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: [
                new Comment({
                    id: 'id-reply',
                    content: 'content-reply',
                    date: new Date(),
                    username: 'username-reply',
                    replies: [],
                }),
            ],
        };

        // Action
        const { id, content, date, username, replies } = new Comment(
            payload,
        );

        // Assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(date).toEqual(payload.date);
        expect(username).toEqual(payload.username);
        expect(replies).toHaveLength(1);
        expect(replies[0]).toStrictEqual(payload.replies[0]);
    });
});
