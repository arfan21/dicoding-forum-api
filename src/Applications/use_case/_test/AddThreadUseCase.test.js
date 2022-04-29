const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Dicoding Indonesia',
            body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            owner: 'user-123',
        };

        const expectedCreatedThread = new CreatedThread({
            id: 'thread-123',
            title: 'Dicoding Indonesia',
            owner: 'user-123',
        });

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockThreadRepository.addThread = jest.fn(() =>
            Promise.resolve(
                new CreatedThread({
                    id: 'thread-123',
                    title: 'Dicoding Indonesia',
                    owner: 'user-123',
                }),
            ),
        );

        /** creating use case instance */
        const getThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const createdThread = await getThreadUseCase.execute(
            useCasePayload,
        );

        // Assert
        expect(createdThread).toStrictEqual(expectedCreatedThread);
        expect(mockThreadRepository.addThread).toBeCalledWith(
            new NewThread({
                title: useCasePayload.title,
                body: useCasePayload.body,
                owner: useCasePayload.owner,
            }),
        );
    });
});
