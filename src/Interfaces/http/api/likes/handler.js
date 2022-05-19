const { Container } = require('instances-container');
const UpdateLikeUseCase = require('../../../../Applications/use_case/UpdateLikeUseCase');

class LikesHandler {
    /**
     *
     * @param {Container} container
     */
    constructor(container) {
        this._container = container;

        this.updateLikeHandler = this.updateLikeHandler.bind(this);
    }

    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    async updateLikeHandler(request, h) {
        /**
         * @type {UpdateLikeUseCase}
         */
        const updateLikeUseCase = this._container.getInstance(
            UpdateLikeUseCase.name,
        );

        const { threadId, commentId } = request.params;

        await updateLikeUseCase.execute({
            thread: threadId,
            comment: commentId,
            owner: request.auth.credentials.id,
        });

        return h
            .response({
                status: 'success',
            })
            .code(200);
    }
}

module.exports = LikesHandler;
