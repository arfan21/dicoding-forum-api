/* istanbul ignore file */
const { Server } = require('@hapi/hapi');

const AccessTokenTestHelper = {
    /**
     *
     * @param {Server} server
     */
    getAccessToken: async (
        server,
        payload = {
            username: 'dicoding',
            password: 'scret',
            fullname: 'Dicoding Indonesia',
        },
    ) => {
        // add user
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: payload.username,
                password: payload.password,
                fullname: payload.fullname,
            },
        });
        // login user
        const loginResponse = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: {
                username: payload.username,
                password: payload.password,
            },
        });

        const {
            data: { accessToken },
        } = JSON.parse(loginResponse.payload);

        return accessToken;
    },
};

module.exports = AccessTokenTestHelper;
