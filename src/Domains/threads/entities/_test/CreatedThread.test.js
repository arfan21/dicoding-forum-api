const CreatedThread = require('../CreatedThread');

describe('CreatedThread entities', () => {
    it('should create createdThread object correctly', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            owner: 'owner',
        };

        // Action
        const createdThread = new CreatedThread(payload);

        // Assert
        expect(createdThread.id).toEqual(payload.id);
        expect(createdThread.title).toEqual(payload.title);
        expect(createdThread.owner).toEqual(payload.owner);
    });

    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
        };

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            'CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 'id',
            title: 'title',
            owner: 1234,
        };

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            'CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
    });
});
