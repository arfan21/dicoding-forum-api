const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addComment', () => {
        it('should persist new comment and return new comment correctly', async () => {
            // arrange
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });

            const newComment = new NewComment({
                content: 'content',
                owner: 'user-123',
                thread: 'thread-123',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            await commentRepository.addComment(newComment);

            // Assert
            const comment =
                await CommentsTableTestHelper.findCommentById(
                    'comment-123',
                );
            expect(comment).toHaveLength(1);
        });

        it('should return comment correctly', async () => {
            // arrange
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
                password: 'secret_password',
            });

            await ThreadsTableTestHelper.addThread({
                title: 'title',
                body: 'body',
            });

            const newComment = new NewComment({
                content: 'content',
                owner: 'user-123',
                thread: 'thread-123',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            const result = await commentRepository.addComment(
                newComment,
            );

            // Assert
            expect(result).toStrictEqual(
                new CreatedComment({
                    id: 'comment-123',
                    content: 'content',
                    owner: 'user-123',
                }),
            );
        });

        it('should persist new reply comment and return new reply comment correctly', async () => {
            // arrange
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

            const newComment = new NewComment({
                content: 'content',
                owner: 'user-123',
                thread: 'thread-123',
                reply_to: 'comment-123',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            await commentRepository.addComment(newComment);

            // Assert
            const comment =
                await CommentsTableTestHelper.findCommentById(
                    'reply-123',
                );

            expect(comment).toHaveLength(1);
        });

        it('should return reply comment correctly', async () => {
            // arrange
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

            const newComment = new NewComment({
                content: 'content',
                owner: 'user-123',
                thread: 'thread-123',
                reply_to: 'comment-123',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            const result = await commentRepository.addComment(
                newComment,
            );

            // Assert
            expect(result).toStrictEqual(
                new CreatedComment({
                    id: 'reply-123',
                    content: 'content',
                    owner: 'user-123',
                }),
            );
        });
    });

    describe('deleteComment', () => {
        it('should delete comment', async () => {
            // arrange
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

            const commentRepository = new CommentRepositoryPostgres(
                pool,
                {},
            );

            // Action
            await commentRepository.deleteComment('comment-123');

            // Assert
            const comment =
                await CommentsTableTestHelper.findCommentById(
                    'comment-123',
                );

            expect(comment).toHaveLength(1);
            expect(comment[0]?.deleted_at).not.toBeNull();
        });

        it('should delete reply comment', async () => {
            // arrange
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
                id: 'reply-123',
                content: 'content-reply',
            });

            const commentRepository = new CommentRepositoryPostgres(
                pool,
                {},
            );

            // Action
            await commentRepository.deleteComment('reply-123');

            // Assert
            const comment =
                await CommentsTableTestHelper.findCommentById(
                    'reply-123',
                );

            expect(comment).toHaveLength(1);
            expect(comment[0]?.deleted_at).not.toBeNull();
        });

        it('should throw NotFound error when comment not found', async () => {
            // arrange
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                {},
            );

            // Action & Assert
            await expect(
                commentRepository.deleteComment('comment-123'),
            ).rejects.toThrowError(NotFoundError);
        });
    });

    describe('verifyCommentExists', () => {
        it('should verify comment', async () => {
            // arrange
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

            const commentRepository = new CommentRepositoryPostgres(
                pool,
                {},
            );

            // Action & Assert
            const comment =
                await CommentsTableTestHelper.findCommentById(
                    'comment-123',
                );

            await expect(
                commentRepository.verifyCommentExists('comment-123'),
            ).resolves.toStrictEqual({
                id: 'comment-123',
                content: 'content-comment',
                owner: 'user-123',
                thread: 'thread-123',
                reply_to: null,
                deleted_at: null,
                date: comment[0]?.date,
            });
        });

        it('should throw NotFound error when comment not found', async () => {
            // arrange
            const commentRepository = new CommentRepositoryPostgres(
                pool,
                {},
            );

            // Action & Assert
            await expect(
                commentRepository.verifyCommentExists('comment-123'),
            ).rejects.toThrowError(NotFoundError);
        });
    });
});
