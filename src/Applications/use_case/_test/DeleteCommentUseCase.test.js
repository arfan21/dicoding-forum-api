const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
    it('should orchestrating the delete comment action correctly', async () => {
        // Arrange
        const useCasePayload = 'comment-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.deleteComment = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        mockCommentRepository.verifyCommentExists = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve({
                    id: 'comment-123',
                    thread: 'thread-123',
                    content:
                        'Dicoding Indonesia adalah sebuah platform untuk belajar',
                    owner: 'user-123',
                    reply_to: null,
                    deleted_at: null,
                    date: new Date(),
                }),
            );

        mockThreadRepository.verifyThreadExists = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action & Assert
        await expect(
            deleteCommentUseCase.execute(useCasePayload, 'user-123'),
        ).resolves.toBeUndefined();
        expect(mockCommentRepository.deleteComment).toBeCalledWith(
            useCasePayload,
        );
        expect(
            mockCommentRepository.verifyCommentExists,
        ).toBeCalledWith(useCasePayload);
        expect(
            mockThreadRepository.verifyThreadExists,
        ).toBeCalledWith('thread-123');
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
        mockCommentRepository.verifyCommentExists = jest
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
            deleteCommentUseCase.execute(useCasePayload, 'user-123'),
        ).rejects.toThrowError(NotFoundError);
        expect(
            mockCommentRepository.verifyCommentExists,
        ).toBeCalledWith(useCasePayload);
    });

    it('should throw an error when user not owner', async () => {
        // Arrange
        const useCasePayload = 'comment-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.deleteComment = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        mockCommentRepository.verifyCommentExists = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve({
                    id: 'comment-123',
                    thread: 'thread-123',
                    content:
                        'Dicoding Indonesia adalah sebuah platform untuk belajar',
                    owner: 'user-123',
                    reply_to: null,
                    deleted_at: null,
                    date: new Date(),
                }),
            );

        /** creating use case instance */
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action & Assert
        await expect(
            deleteCommentUseCase.execute(useCasePayload, 'user-1234'),
        ).rejects.toThrowError(AuthorizationError);
        expect(
            mockCommentRepository.verifyCommentExists,
        ).toBeCalledWith(useCasePayload);
    });
});
