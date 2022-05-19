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
            likeCount: 2,
            replies: [],
        };

        // Action
        const { id, content, date, username, replies, likeCount } =
            new Comment(payload);

        // Assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(date).toEqual(payload.date);
        expect(username).toEqual(payload.username);
        expect(replies).toBeUndefined();
        expect(likeCount).toEqual(payload.likeCount);
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
        const dateReply = new Date();
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: [
                {
                    id: 'id-reply',
                    content: 'content-reply',
                    date: dateReply,
                    username: 'username-reply',
                    replies: [],
                },
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
        expect(replies[0]).toStrictEqual(
            new Comment({
                id: 'id-reply',
                content: 'content-reply',
                date: dateReply,
                username: 'username-reply',
                replies: [],
            }),
        );
    });

    it('should create Comment when comment and reply deleted', () => {
        // Arrange
        const dateReply = new Date();
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            deleted_at: new Date(),
            replies: [
                {
                    id: 'id-reply',
                    content: 'content-reply',
                    date: dateReply,
                    username: 'username-reply',
                    deleted_at: dateReply,
                    reply_to: 'id',
                    replies: [],
                },
            ],
        };

        // Action
        const { id, content, date, username, replies } = new Comment(
            payload,
        );

        // Assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual('**komentar telah dihapus**');
        expect(date).toEqual(payload.date);
        expect(username).toEqual(payload.username);
        expect(replies).toHaveLength(1);
        expect(replies[0]).toStrictEqual(
            new Comment({
                id: 'id-reply',
                content: '**balasan telah dihapus**',
                date: dateReply,
                username: 'username-reply',
                replies: [],
            }),
        );
    });

    it('likeCount should 0 when missing key likeCount', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            date: new Date(),
            username: 'username',
            replies: [],
        };

        // Action
        const { likeCount } = new Comment(payload);

        // Assert
        expect(likeCount).toEqual(0);
    });
});
