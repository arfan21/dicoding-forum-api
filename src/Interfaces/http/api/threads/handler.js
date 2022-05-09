const { Container } = require('instances-container');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const FindThreadByIdUseCase = require('../../../../Applications/use_case/FindThreadByIdUseCase');

class ThreadsHandler {
    /**
     *
     * @param {Container} container
     */
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.findThreadByIdHandler =
            this.findThreadByIdHandler.bind(this);
    }

    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    async postThreadHandler(request, h) {
        /**
         * @type {AddThreadUseCase}
         */
        const addThreadUseCase = this._container.getInstance(
            AddThreadUseCase.name,
        );

        const addedThread = await addThreadUseCase.execute({
            ...request.payload,
            owner: request.auth.credentials.id,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedThread,
            },
        });

        response.code(201);
        return response;
    }

    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    async findThreadByIdHandler(request, h) {
        const { id } = request.params;

        /**
         * @type {FindThreadByIdUseCase}
         */
        const findThreadByIdUseCase = this._container.getInstance(
            FindThreadByIdUseCase.name,
        );

        const thread = await findThreadByIdUseCase.execute(id);
        const response = h.response({
            status: 'success',
            data: {
                thread,
            },
        });

        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;
