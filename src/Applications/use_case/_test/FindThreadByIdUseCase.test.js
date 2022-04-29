const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const Comment = require('../../../Domains/comments/entities/Comment');
const Thread = require('../../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const FindThreadByIdUseCase = require('../FindThreadByIdUseCase');

describe('FindThreadByIdUseCase', () => {
    it('should orchestrating the find thread by id action correctly', async () => {
        // Arrange
        const useCasePayload = 'thread-123';
        const dateStub = new Date();
        const expectedThread = new Thread({
            id: 'thread-123',
            title: 'Dicoding Indonesia',
            body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            date: dateStub,
            username: 'user-123',
            comments: [
                new Comment({
                    id: 'comment-123',
                    content:
                        'Dicoding Indonesia adalah sebuah platform untuk belajar',
                    date: dateStub,
                    username: 'user-123',
                    replies: [
                        new Comment({
                            id: 'reply-123',
                            content:
                                'Dicoding Indonesia adalah sebuah platform untuk belajar',
                            date: dateStub,
                            username: 'user-123',
                        }),
                    ],
                }),
            ],
        });

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockThreadRepository.findThreadById = jest.fn(() =>
            Promise.resolve(
                new Thread({
                    id: 'thread-123',
                    title: 'Dicoding Indonesia',
                    body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
                    date: dateStub,
                    username: 'user-123',
                    comments: [
                        new Comment({
                            id: 'comment-123',
                            content:
                                'Dicoding Indonesia adalah sebuah platform untuk belajar',
                            date: dateStub,
                            username: 'user-123',
                            replies: [
                                new Comment({
                                    id: 'reply-123',
                                    content:
                                        'Dicoding Indonesia adalah sebuah platform untuk belajar',
                                    date: dateStub,
                                    username: 'user-123',
                                }),
                            ],
                        }),
                    ],
                }),
            ),
        );

        /** creating use case instance */
        const getThreadUseCase = new FindThreadByIdUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const thread = await getThreadUseCase.execute(useCasePayload);
        // Assert
        expect(thread).toStrictEqual(expectedThread);
        expect(mockThreadRepository.findThreadById).toBeCalledWith(
            useCasePayload,
        );
    });

    it('should throw an error when the thread is not found', async () => {
        // Arrange
        const useCasePayload = 'thread-123';
        const expectedError = new NotFoundError('Thread not found');

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockThreadRepository.findThreadById = jest.fn(() =>
            Promise.reject(expectedError),
        );

        /** creating use case instance */
        const getThreadUseCase = new FindThreadByIdUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        await expect(
            getThreadUseCase.execute(useCasePayload),
        ).rejects.toThrow(NotFoundError);
    });
});
