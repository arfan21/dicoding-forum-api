const CommentRepository = require('../CommentRepository');

describe('CommentRepository', () => {
    it('should throw error when addComment method not implemented', async () => {
        // Arrange
        const commentRepository = new CommentRepository();

        // Action and Assert
        await expect(
            commentRepository.addComment({}),
        ).rejects.toThrowError(
            'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            commentRepository.deleteComment('id'),
        ).rejects.toThrowError(
            'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );

        await expect(
            commentRepository.verifyCommentExists('id'),
        ).rejects.toThrowError(
            'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
    });
});
