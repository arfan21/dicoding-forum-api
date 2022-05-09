const { Container } = require('instances-container');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
    /**
     *
     * @param {Container} container
     */
    constructor(container) {
        this._container = container;

        this.postCommentHandler = this.postCommentHandler.bind(this);
        this.postReplyHandler = this.postReplyHandler.bind(this);
        this.deleteCommentHandler =
            this.deleteCommentHandler.bind(this);
        this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
    }

    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    async postCommentHandler(request, h) {
        const { id } = request.params;

        /**
         * @type {AddCommentUseCase}
         */
        const addCommentUseCase = this._container.getInstance(
            AddCommentUseCase.name,
        );

        const addedComment = await addCommentUseCase.execute({
            ...request.payload,
            thread: id,
            owner: request.auth.credentials.id,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedComment,
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
    async postReplyHandler(request, h) {
        const { threadId, commentId } = request.params;

        /**
         * @type {AddCommentUseCase}
         */
        const addCommentUseCase = this._container.getInstance(
            AddCommentUseCase.name,
        );

        const addedReply = await addCommentUseCase.execute({
            ...request.payload,
            thread: threadId,
            owner: request.auth.credentials.id,
            reply_to: commentId,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedReply,
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
    async deleteCommentHandler(request, h) {
        const { commentId } = request.params;

        /**
         * @type {DeleteCommentUseCase}
         */
        const deleteCommentUseCase = this._container.getInstance(
            DeleteCommentUseCase.name,
        );

        await deleteCommentUseCase.execute(
            commentId,
            request.auth.credentials.id,
        );

        const response = h.response({
            status: 'success',
        });

        response.code(200);
        return response;
    }

    /**
     *
     * @param {import('@hapi/hapi').Request} request
     * @param {import('@hapi/hapi').ResponseToolkit} h
     */
    async deleteReplyHandler(request, h) {
        const { replyId } = request.params;

        /**
         * @type {DeleteCommentUseCase}
         */
        const deleteCommentUseCase = this._container.getInstance(
            DeleteCommentUseCase.name,
        );

        await deleteCommentUseCase.execute(
            replyId,
            request.auth.credentials.id,
        );

        const response = h.response({
            status: 'success',
        });

        response.code(200);
        return response;
    }
}

module.exports = CommentsHandler;
