const Thread = require('../Thread');

describe('CreatedThread entities', () => {
    it('should create createdThread object correctly', () => {
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
        const createdThread = new Thread(payload);

        // Assert
        expect(createdThread.id).toEqual(payload.id);
        expect(createdThread.title).toEqual(payload.title);
        expect(createdThread.body).toEqual(payload.body);
        expect(createdThread.date).toEqual(
            payload.date.toISOString(),
        );
        expect(createdThread.username).toEqual(payload.username);
        expect(createdThread.comments).toEqual(payload.comments);
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
});
