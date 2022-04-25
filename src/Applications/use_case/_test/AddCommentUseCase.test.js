const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
    it('should orchestrating the add comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            thread: 'thread-123',
            content:
                'Dicoding Indonesia adalah sebuah platform untuk belajar',
            owner: 'user-123',
        };

        const expectedCreatedComment = new CreatedComment({
            id: 'comment-123',
            thread: 'thread-123',
            content:
                'Dicoding Indonesia adalah sebuah platform untuk belajar',
            owner: 'user-123',
        });

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.addComment = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve(
                    new CreatedComment({
                        id: 'comment-123',
                        thread: 'thread-123',
                        content:
                            'Dicoding Indonesia adalah sebuah platform untuk belajar',
                        owner: 'user-123',
                    }),
                ),
            );

        mockThreadRepository.verifyThreadExists = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const addCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action
        const createdComment = await addCommentUseCase.execute(
            useCasePayload,
        );

        // Assert
        expect(createdComment).toStrictEqual(expectedCreatedComment);
        expect(mockCommentRepository.addComment).toBeCalledWith(
            new NewComment({
                content:
                    'Dicoding Indonesia adalah sebuah platform untuk belajar',
                owner: 'user-123',
                thread: 'thread-123',
            }),
        );
        expect(
            mockThreadRepository.verifyThreadExists,
        ).toBeCalledWith('thread-123');
    });

    it('should throw an error if the thread does not exist', async () => {
        // Arrange
        const useCasePayload = {
            thread: 'thread-123',
            content:
                'Dicoding Indonesia adalah sebuah platform untuk belajar',
            owner: 'user-123',
        };

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.addComment = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve(
                    new CreatedComment({
                        id: 'comment-123',
                        thread: 'thread-123',
                        content:
                            'Dicoding Indonesia adalah sebuah platform untuk belajar',
                        owner: 'user-123',
                    }),
                ),
            );

        mockThreadRepository.verifyThreadExists = jest
            .fn()
            .mockImplementation(() =>
                Promise.reject(
                    new NotFoundError('thread tidak ditemukan'),
                ),
            );

        /** creating use case instance */
        const addCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action & Assert
        await expect(
            addCommentUseCase.execute(useCasePayload),
        ).rejects.toThrow(NotFoundError);

        expect(
            mockThreadRepository.verifyThreadExists,
        ).toBeCalledWith('thread-123');
    });
});
