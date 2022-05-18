const AccessTokenTestHelper = require('../../../../tests/AccessTokenTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('/threads/{threadId}/comments/{commentId}/likes endpoint', () => {
    beforeEach(async () => {
        await UsersTableTestHelper.addUser({
            username: 'dicoding2',
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

    afterAll(async () => {
        await pool.end();
    });

    it('should response 200 and persisted like', async () => {
        // Arrange
        const server = await createServer(container);

        const accessToken =
            await AccessTokenTestHelper.getAccessToken(server);

        // Action
        const response = await server.inject({
            method: 'PUT',
            url: '/threads/thread-123/comments/comment-123/likes',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(200);
        expect(responseJson.status).toEqual('success');
    });
});
