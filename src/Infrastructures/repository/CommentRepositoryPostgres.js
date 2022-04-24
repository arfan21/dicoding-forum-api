const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
    /**
     *
     * @inheritdoc
     */
    async addComment(comment) {}
}

module.exports = CommentRepositoryPostgres;
