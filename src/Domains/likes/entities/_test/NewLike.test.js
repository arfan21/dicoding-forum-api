const NewLike = require('../NewLike');

describe('NewLike entities', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            thread: 'thread',
            owner: 'owner',
        };

        // Action & Assert
        expect(() => new NewLike(payload)).toThrowError(
            'NEW_LIKE.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            thread: 'thread',
            owner: 'owner',
            comment: 1234,
        };

        // Action & Assert
        expect(() => new NewLike(payload)).toThrowError(
            'NEW_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create newLike object correctly', () => {
        // Arrange
        const payload = {
            thread: 'thread',
            owner: 'owner',
            comment: 'comment',
        };

        // Action
        const { thread, owner, comment } = new NewLike(payload);

        // Assert
        expect(thread).toEqual(payload.thread);
        expect(owner).toEqual(payload.owner);
        expect(comment).toEqual(payload.comment);
    });
});
