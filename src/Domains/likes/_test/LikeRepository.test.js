const LikeRepository = require('../LikeRepository');

describe('Like Repository', () => {
    it('should throw error when addLike method not implemented', async () => {
        // Arrange
        const likeRepository = new LikeRepository();

        // Action and Assert
        await expect(likeRepository.addLike({})).rejects.toThrowError(
            'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            likeRepository.checkExistsLike(''),
        ).rejects.toThrowError(
            'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            likeRepository.removeLike(''),
        ).rejects.toThrowError(
            'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
    });
});
