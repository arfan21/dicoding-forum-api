const Comment = require('../../../comments/entities/Comment');
const Thread = require('../Thread');

describe('Thread entities', () => {
    it('should create Thread object correctly', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [],
        };

        // Act
        const thread = new Thread(payload);

        // Assert
        expect(thread.id).toEqual(payload.id);
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
        expect(thread.date).toEqual(payload.date.toISOString());
        expect(thread.username).toEqual(payload.username);
        expect(thread.comments).toEqual(payload.comments);
    });

    it('should create Thread object correctly with comments', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 'id',
                    content: 'content',
                    date: new Date(),
                    username: 'username',
                },
            ],
        };

        // Act
        const thread = new Thread(payload);

        // Assert
        expect(thread.id).toEqual(payload.id);
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
        expect(thread.date).toEqual(payload.date.toISOString());
        expect(thread.username).toEqual(payload.username);
        expect(thread.comments[0]).toStrictEqual(
            new Comment(payload.comments[0]),
        );
    });

    it('should create Thread object correctly with comments and replies', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 'id',
                    content: 'content',
                    date: new Date(),
                    username: 'username',
                    replies: [
                        {
                            id: 'id-reply',
                            content: 'content-reply',
                            date: new Date(),
                            username: 'username-reply',
                        },
                    ],
                },
            ],
        };

        // Act
        const thread = new Thread(payload);

        // Assert
        expect(thread.id).toEqual(payload.id);
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
        expect(thread.date).toEqual(payload.date.toISOString());
        expect(thread.username).toEqual(payload.username);
        expect(thread.comments[0]).toStrictEqual(
            new Comment(payload.comments[0]),
        );
        expect(thread.comments[0].replies[0]).toStrictEqual(
            new Comment(payload.comments[0].replies[0]),
        );
    });

    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
        };

        // Act & Assert
        expect(() => new Thread(payload)).toThrowError(
            'THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload comment not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 'id',
                    content: 'content',
                    date: new Date(),
                },
            ],
        };

        // Action & Assert
        expect(() => new Thread(payload)).toThrowError(
            'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload reply not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 'id',
                    content: 'content',
                    date: new Date(),
                    username: 'username',
                    replies: [
                        {
                            id: 'id-reply',
                            content: 'content-reply',
                            date: new Date(),
                        },
                    ],
                },
            ],
        };

        // Action & Assert
        expect(() => new Thread(payload)).toThrowError(
            'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 1,
            body: 1,
            date: 1,
            username: 1,
            comments: [],
        };

        // Act & Assert
        expect(() => new Thread(payload)).toThrowError(
            'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should throw error when payload comment not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 1,
                    content: 1,
                    date: 1,
                    username: 1,
                },
            ],
        };

        // Act & Assert
        expect(() => new Thread(payload)).toThrowError(
            'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should throw error when payload reply not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            body: 'body',
            date: new Date(),
            username: 'username',
            comments: [
                {
                    id: 'id',
                    content: 'content',
                    date: new Date(),
                    username: 'username',
                    replies: [
                        {
                            id: 1,
                            content: 1,
                            date: 1,
                            username: 1,
                        },
                    ],
                },
            ],
        };

        // Act & Assert
        expect(() => new Thread(payload)).toThrowError(
            'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });
});
