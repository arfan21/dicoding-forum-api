const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const Comment = require('../../../Domains/comments/entities/Comment');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const Thread = require('../../../Domains/threads/entities/Thread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        it('should persist new thread and return new thread correctly', async () => {
            // Arrange
            const newThread = new NewThread({
                title: 'title',
                body: 'body',
                owner: 'user-123',
            });

            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            await threadRepository.addThread(newThread);

            // Assert
            const thread =
                await ThreadsTableTestHelper.findThreadById(
                    'thread-123',
                );
            expect(thread).toHaveLength(1);
        });

        it('should return created thread correctly', async () => {
            // Arrange
            const newThread = new NewThread({
                title: 'title',
                body: 'body',
                owner: 'user-123',
            });

            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            const createdThread = await threadRepository.addThread(
                newThread,
            );

            // Assert
            expect(createdThread).toStrictEqual(
                new CreatedThread({
                    id: 'thread-123',
                    title: 'title',
                    owner: 'user-123',
                }),
            );
        });
    });

    describe('findThreadById function', () => {
        it('should return thread correctly without comment', async () => {
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });
            const existThread =
                await ThreadsTableTestHelper.findThreadById(
                    'thread-123',
                );

            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                null,
            );

            // Action
            const thread = await threadRepository.findThreadById(
                'thread-123',
            );

            // Assert
            expect(thread).toStrictEqual(
                new Thread({
                    id: 'thread-123',
                    title: 'title',
                    body: 'body',
                    date: new Date(existThread[0]?.date),
                    username: 'dicoding',
                    comments: [],
                }),
            );
        });

        it('should return thread correctly with comment', async () => {
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });

            await CommentsTableTestHelper.addComment({
                content: 'content-comment',
            });

            const existThread =
                await ThreadsTableTestHelper.findThreadById(
                    'thread-123',
                );

            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                null,
            );

            // Action
            const thread = await threadRepository.findThreadById(
                'thread-123',
            );

            // Assert
            expect(thread).toStrictEqual(
                new Thread({
                    id: 'thread-123',
                    title: 'title',
                    body: 'body',
                    date: new Date(existThread?.[0]?.date),
                    username: 'dicoding',
                    comments: [
                        new Comment({
                            id: 'comment-123',
                            content: 'content-comment',
                            date: new Date(
                                existThread?.[0]?.comments?.[0]?.date,
                            ),
                            username: 'dicoding',
                            reply_to: null,
                        }),
                    ],
                }),
            );

            expect(thread.comments[0].replies).toBeUndefined();
        });

        it('should return thread correctly with comment and reply', async () => {
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });

            await CommentsTableTestHelper.addComment({
                content: 'content-comment',
            });

            await CommentsTableTestHelper.addComment({
                id: 'comment-1234',
                content: 'content-comment-reply',
                reply_to: 'comment-123',
            });

            const existThread =
                await ThreadsTableTestHelper.findThreadById(
                    'thread-123',
                );

            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                null,
            );

            // Action
            const thread = await threadRepository.findThreadById(
                'thread-123',
            );

            // Assert
            expect(thread).toStrictEqual(
                new Thread({
                    id: 'thread-123',
                    title: 'title',
                    body: 'body',
                    date: new Date(existThread?.[0]?.date),
                    username: 'dicoding',
                    comments: [
                        new Comment({
                            id: 'comment-123',
                            content: 'content-comment',
                            date: new Date(
                                existThread?.[0]?.comments?.[0]?.date,
                            ),
                            username: 'dicoding',
                            replies: [
                                new Comment({
                                    id: 'comment-1234',
                                    content: 'content-comment-reply',
                                    date: new Date(
                                        existThread?.[0]?.comments?.[0]?.replies?.[0]?.date,
                                    ),
                                    username: 'dicoding',
                                    reply_to: 'comment-123',
                                    replies: [],
                                }),
                            ],
                        }),
                    ],
                }),
            );
        });

        it('should return thread correctly with deleted comment', async () => {
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });

            await CommentsTableTestHelper.addComment({
                content: 'content-comment',
                deleted_at: new Date(),
            });

            await CommentsTableTestHelper.addComment({
                id: 'comment-1234',
                content: 'content-comment-reply',
                reply_to: 'comment-123',
                deleted_at: new Date(),
            });

            const existThread =
                await ThreadsTableTestHelper.findThreadById(
                    'thread-123',
                );

            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                null,
            );

            // Action
            const thread = await threadRepository.findThreadById(
                'thread-123',
            );

            // Assert
            expect(thread).toStrictEqual(
                new Thread({
                    id: 'thread-123',
                    title: 'title',
                    body: 'body',
                    date: new Date(existThread?.[0]?.date),
                    username: 'dicoding',
                    comments: [
                        new Comment({
                            id: 'comment-123',
                            content: '**komentar telah dihapus**',
                            date: new Date(
                                existThread?.[0]?.comments?.[0]?.date,
                            ),
                            username: 'dicoding',
                            replies: [
                                new Comment({
                                    id: 'comment-1234',
                                    content:
                                        '**komentar telah dihapus**',
                                    date: new Date(
                                        existThread?.[0]?.comments?.[0]?.replies?.[0]?.date,
                                    ),
                                    username: 'dicoding',
                                    reply_to: 'comment-123',
                                    replies: [],
                                }),
                            ],
                        }),
                    ],
                }),
            );
        });

        it('should throw NotFoundError when thread not found', async () => {
            const threadRepository = new ThreadRepositoryPostgres(
                pool,
                null,
            );

            // Action and Assert

            await expect(
                threadRepository.findThreadById('thread-123'),
            ).rejects.toThrowError(NotFoundError);
        });
    });
});
