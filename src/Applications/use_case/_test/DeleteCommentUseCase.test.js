const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
    it('should orchestrating the delete comment action correctly', async () => {
        // Arrange
        const useCasePayload = 'comment-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();

        /** mocking needed function */
        mockCommentRepository.deleteComment = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        // Action & Assert
        await expect(
            deleteCommentUseCase.execute(useCasePayload),
        ).resolves.toBeUndefined();
        expect(mockCommentRepository.deleteComment).toBeCalledWith(
            useCasePayload,
        );
    });

    it('should throw an error when the comment is not found', async () => {
        // Arrange
        const useCasePayload = 'comment-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();

        /** mocking needed function */
        mockCommentRepository.deleteComment = jest
            .fn()
            .mockImplementation(() =>
                Promise.reject(new NotFoundError('Not found')),
            );

        /** creating use case instance */
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        // Action & Assert
        await expect(
            deleteCommentUseCase.execute(useCasePayload),
        ).rejects.toThrowError(NotFoundError);
        expect(mockCommentRepository.deleteComment).toBeCalledWith(
            useCasePayload,
        );
    });
});
