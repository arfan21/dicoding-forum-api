const AccessTokenTestHelper = require('../../../../tests/AccessTokenTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('/threads endpoint', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('when POST /threads', () => {
        it('should response 201 and persisted thread', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payload = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();
            expect(responseJson.data.addedThread.id).toBeDefined();
            expect(responseJson.data.addedThread.title).toBeDefined();
            expect(responseJson.data.addedThread.owner).toBeDefined();
        });

        it('should response 400 when request payload not contain needed property', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payload = {
                title: 'Dicoding Indonesia',
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload,
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

            const payload = {
                title: 'Dicoding Indonesia',
                body: [
                    'Dicoding Indonesia adalah sebuah platform untuk belajar',
                ],
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
        });

        it('should response 401 when request not contain access token', async () => {
            // Arrange
            const server = await createServer(container);

            const payload = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload,
            });

            // Assert
            expect(response.statusCode).toEqual(401);
        });
    });

    describe('when GET /threads/{id}', () => {
        it('should response 200 and thread', async () => {
            // Arrange
            const server = await createServer(container);

            const accessToken =
                await AccessTokenTestHelper.getAccessToken(server);

            const payload = {
                title: 'Dicoding Indonesia',
                body: 'Dicoding Indonesia adalah sebuah platform untuk belajar',
            };

            const responseCreateThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseCreateThreadJson = JSON.parse(
                responseCreateThread.payload,
            );
            const createdThread =
                responseCreateThreadJson.data.addedThread;

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/threads/${createdThread.id}`,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.thread).toBeDefined();
            expect(responseJson.data.thread.id).toBeDefined();
            expect(responseJson.data.thread.title).toBeDefined();
            expect(responseJson.data.thread.body).toBeDefined();
            expect(responseJson.data.thread.username).toBeDefined();
            expect(responseJson.data.thread.date).toBeDefined();
            expect(responseJson.data.thread.comments).toBeDefined();
            expect(responseJson.data.thread.id).toEqual(
                createdThread.id,
            );
        });
    });
});
