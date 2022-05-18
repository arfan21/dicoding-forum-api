const CommentRepository = require('../../../Domains/comments/CommentRepository');
const NewLike = require('../../../Domains/likes/entities/NewLike');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UpdateLikeUseCase = require('../UpdateLikeUseCase');

describe('UpdateLikeUseCase', () => {
    it('should orchestrating the add like action correctly', async () => {
        // Arrange
        const useCasePayload = {
            comment: 'comment-123',
            owner: 'user-123',
            thread: 'thread-123',
        };

        const expectedUpdatedComment = 'like-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();
        const mockLikeRepository = new LikeRepository();

        /** mocking needed function */
        mockCommentRepository.verifyCommentExists = jest.fn(() =>
            Promise.resolve(),
        );

        mockThreadRepository.verifyThreadExists = jest.fn(() =>
            Promise.resolve(),
        );

        mockLikeRepository.checkExistsLike = jest.fn(() =>
            Promise.reject(),
        );

        mockLikeRepository.addLike = jest.fn(() =>
            Promise.resolve('like-123'),
        );

        mockLikeRepository.removeLike = jest.fn(() =>
            Promise.resolve(),
        );

        /** creating use case instance */
        const updateLikeUseCase = new UpdateLikeUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
            likeRepository: mockLikeRepository,
        });

        // Action
        const idComment = await updateLikeUseCase.execute(
            useCasePayload,
        );

        // Assert
        expect(idComment).toEqual(expectedUpdatedComment);
        expect(mockLikeRepository.checkExistsLike).toBeCalledWith(
            useCasePayload.thread,
            useCasePayload.owner,
            useCasePayload.comment,
        );
        expect(mockLikeRepository.addLike).toBeCalledWith(
            new NewLike(useCasePayload),
        );
    });

    it('should orchestrating the remove like action correctly', async () => {
        // Arrange
        const useCasePayload = {
            comment: 'comment-123',
            owner: 'user-123',
            thread: 'thread-123',
        };

        const expectedUpdatedComment = 'like-123';

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();
        const mockLikeRepository = new LikeRepository();

        /** mocking needed function */
        mockCommentRepository.verifyCommentExists = jest.fn(() =>
            Promise.resolve(),
        );

        mockThreadRepository.verifyThreadExists = jest.fn(() =>
            Promise.resolve(),
        );

        mockLikeRepository.checkExistsLike = jest.fn(() =>
            Promise.resolve('like-123'),
        );

        mockLikeRepository.addLike = jest.fn(() => Promise.resolve());

        mockLikeRepository.removeLike = jest.fn(() =>
            Promise.resolve(),
        );

        /** creating use case instance */
        const updateLikeUseCase = new UpdateLikeUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
            likeRepository: mockLikeRepository,
        });

        // Action
        const idComment = await updateLikeUseCase.execute(
            useCasePayload,
        );

        // Assert
        expect(idComment).toBeUndefined();
        expect(mockLikeRepository.checkExistsLike).toBeCalledWith(
            useCasePayload.thread,
            useCasePayload.owner,
            useCasePayload.comment,
        );
        expect(mockLikeRepository.removeLike).toBeCalledWith(
            expectedUpdatedComment,
        );
    });
});
