const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const NewLike = require('../../../Domains/likes/entities/NewLike');
const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

describe('Like Repository', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
        await LikesTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addLike', () => {
        beforeEach(async () => {
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
        });

        afterEach(async () => {
            await UsersTableTestHelper.cleanTable();
            await ThreadsTableTestHelper.cleanTable();
            await CommentsTableTestHelper.cleanTable();
            await LikesTableTestHelper.cleanTable();
        });

        it('should persist new like and return new like correctly', async () => {
            // arrange
            const newLike = new NewLike({
                thread: 'thread-123',
                owner: 'user-123',
                comment: 'comment-123',
            });

            const fakeIdGenerator = () => '123'; // stub!

            const likeRepository = new LikeRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            await likeRepository.addLike(newLike);

            // Assert
            const like = await LikesTableTestHelper.findLikeById(
                'like-123',
            );

            expect(like).toHaveLength(1);

            expect(like[0].id).toEqual('like-123');
        });
    });

    describe('checkExistsLike', () => {
        it('should return id if like exists', async () => {
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

            await LikesTableTestHelper.addLike({
                thread: 'thread-123',
                owner: 'user-123',
                comment: 'comment-123',
                id: 'like-123',
            });

            const likeRepository = new LikeRepositoryPostgres(
                pool,
                null,
            );
            // Action
            const result = await likeRepository.checkExistsLike(
                'thread-123',
                'user-123',
                'comment-123',
            );
            // Assert
            expect(result).toEqual('like-123');
        });

        it('it should throw NotFoundError if like does not exist', async () => {
            const likeRepository = new LikeRepositoryPostgres(
                pool,
                null,
            );
            // Action & Assert
            await expect(
                likeRepository.checkExistsLike(
                    'thread-123',
                    'user-123',
                    'comment-456',
                ),
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe('removeLike', () => {
        it('should remove like', async () => {
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

            await LikesTableTestHelper.addLike({
                thread: 'thread-123',
                owner: 'user-123',
                comment: 'comment-123',
                id: 'like-123',
            });

            const likeRepository = new LikeRepositoryPostgres(
                pool,
                null,
            );

            // Action
            await likeRepository.removeLike('like-123');

            // Assert
            const like = await LikesTableTestHelper.findLikeById(
                'like-123',
            );

            expect(like).toHaveLength(0);
        });

        it('should throw NotFoundError if like does not exist', async () => {
            const likeRepository = new LikeRepositoryPostgres(
                pool,
                null,
            );
            // Action & Assert
            await expect(
                likeRepository.removeLike('like-123'),
            ).rejects.toThrow(NotFoundError);
        });
    });
});
