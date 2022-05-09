const AccessTokenTestHelper = require('../../../../tests/AccessTokenTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('/threads/{id}/comments endpoint', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('when POST /threads/{id}/comments', () => {
        it('should response 201 and persisted comment', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadThread = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    ...payloadThread,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            const payloadComment = {
                content: 'comment content',
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedComment).toBeDefined();
            expect(responseJson.data.addedComment.id).toBeDefined();
            expect(
                responseJson.data.addedComment.content,
            ).toBeDefined();
            expect(
                responseJson.data.addedComment.owner,
            ).toBeDefined();
        });

        it('should response 400 when request payload not contain needed property', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadComment = {};

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/111/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 400 when request payload not meet data type specification', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadComment = {
                content: ['comment content'],
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/111/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 401 when access token is not provided', async () => {
            // Arrange
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/1/comments`,
            });

            // Assert
            expect(response.statusCode).toEqual(401);
        });
    });

    describe('when POST /threads/{id}/comments/{commentId}/replies', () => {
        it('should response 201 and persisted reply', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadThread = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    ...payloadThread,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            const payloadComment = {
                content: 'comment content',
            };

            const responseCreateComment = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateCommentJson = JSON.parse(
                responseCreateComment.payload,
            );
            const createdComment =
                responseCreateCommentJson.data.addedComment;

            const payloadReply = {
                content: 'comment content reply',
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments/${createdComment.id}/replies`,
                payload: {
                    ...payloadReply,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedReply).toBeDefined();
            expect(responseJson.data.addedReply.id).toBeDefined();
            expect(
                responseJson.data.addedReply.content,
            ).toBeDefined();
            expect(responseJson.data.addedReply.owner).toBeDefined();
        });
    });

    describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
        it('should response 200 and deleted comment', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadThread = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    ...payloadThread,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            const payloadComment = {
                content: 'comment content',
            };

            const responseCreateComment = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateCommentJson = JSON.parse(
                responseCreateComment.payload,
            );
            const createdComment =
                responseCreateCommentJson.data.addedComment;

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${createdThread.id}/comments/${createdComment.id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });

        it('should response 404 when comment not found', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/111/comments/1111`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 403 when user is not owner', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadThread = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    ...payloadThread,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            const payloadComment = {
                content: 'comment content',
            };

            const responseCreateComment = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateCommentJson = JSON.parse(
                responseCreateComment.payload,
            );
            const createdComment =
                responseCreateCommentJson.data.addedComment;

            const accessTokenDifferent =
                await AccessTokenTestHelper.getAccessToken(server, {
                    username: 'anonim',
                    password: 'anonim',
                    fullname: 'anonim',
                });

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${createdThread.id}/comments/${createdComment.id}`,
                headers: {
                    Authorization: `Bearer ${accessTokenDifferent}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(403);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 401 when user is not logged in', async () => {
            // Arrange
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/111/comments/1111`,
            });

            // Assert
            expect(response.statusCode).toEqual(401);
        });
    });

    describe('when DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}', () => {
        it('should response 200 and deleted reply', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payloadThread = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    ...payloadThread,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            const payloadComment = {
                content: 'comment content',
            };

            const responseCreateComment = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments`,
                payload: {
                    ...payloadComment,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateCommentJson = JSON.parse(
                responseCreateComment.payload,
            );
            const createdComment =
                responseCreateCommentJson.data.addedComment;

            const payloadReply = {
                content: 'comment content reply',
            };

            const responseCreateReply = await server.inject({
                method: 'POST',
                url: `/threads/${createdThread.id}/comments/${createdComment.id}/replies`,
                payload: {
                    ...payloadReply,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateReplyJson = JSON.parse(
                responseCreateReply.payload,
            );
            const createdReply =
                responseCreateReplyJson.data.addedReply;

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${createdThread.id}/comments/${createdComment.id}/replies/${createdReply.id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });

        it('should response 404 when reply not found', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/thread-CBxWxBWawcrnP7Jhf0dCb/comments/comment-Z4mPvWWsLTUuWwwkQjymJ/replies/xxx`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 401 when user is not logged in', async () => {
            // Arrange
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/111/comments/1111/replies/1111`,
            });

            // Assert
            expect(response.statusCode).toEqual(401);
        });
    });
});
