const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository', () => {
    it('should throw error when addThread method not implemented', async () => {
        // Arrange
        const threadRepository = new ThreadRepository();

        // Action and Assert
        await expect(
            threadRepository.addThread({}),
        ).rejects.toThrowError(
            'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            threadRepository.findThreadById(''),
        ).rejects.toThrowError(
            'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            threadRepository.verifyThreadExists(''),
        ).rejects.toThrowError(
            'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
    });
});
