const NewComment = require('../NewComment');

describe('NewComment', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            content: 'content',
            owner: 'owner',
        };

        // Action & Assert
        expect(() => new NewComment(payload)).toThrowError(
            'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            content: 'content',
            owner: 1234,
            thread: 'thread',
        };

        // Action & Assert
        expect(() => new NewComment(payload)).toThrowError(
            'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create newComment object correctly', () => {
        // Arrange
        const payload = {
            content: 'content',
            owner: 'owner',
            thread: 'thread',
        };

        // Action
        const { content, owner, thread } = new NewComment(payload);

        // Assert
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
        expect(thread).toEqual(payload.thread);
    });

    it('should throw error when reply_to not meet data type specification', () => {
        // Arrange
        const payload = {
            content: 'content',
            owner: 'owner',
            thread: 'thread',
            reply_to: 1234,
        };

        // Action & Assert
        expect(() => new NewComment(payload)).toThrowError(
            'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create newComment object correctly with reply_to', () => {
        // Arrange
        const payload = {
            content: 'content',
            owner: 'owner',
            thread: 'thread',
            reply_to: 'reply_to',
        };

        // Action
        const { content, owner, thread, reply_to } = new NewComment(
            payload,
        );

        // Assert
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
        expect(thread).toEqual(payload.thread);
        expect(reply_to).toEqual(payload.reply_to);
    });
});
