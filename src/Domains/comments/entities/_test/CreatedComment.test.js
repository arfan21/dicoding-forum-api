const CreatedComment = require('../CreatedComment');

describe('CreatedComment', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
        };

        // Action & Assert
        expect(() => new CreatedComment(payload)).toThrowError(
            'CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 1234,
            owner: 'owner',
        };

        // Action & Assert
        expect(() => new CreatedComment(payload)).toThrowError(
            'CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });

    it('should create createdComment object correctly', () => {
        // Arrange
        const payload = {
            id: 'id',
            content: 'content',
            owner: 'owner',
        };

        // Action
        const { id, content, owner } = new CreatedComment(payload);

        // Assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
});
