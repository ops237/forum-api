import CommentsRepository from '../../Domains/comments/CommentsRepository.js';
import AddedComment from '../../Domains/comments/entities/AddedComment.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';
import AuthorizationError from '../../Commons/exceptions/AuthorizationError.js';

class CommentRepositoryPostgres extends CommentsRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addComment(newComment, threadId, owner) {
        const { content } = newComment;
        const id = `comment-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO comments(id, content, thread_id, owner) VALUES($1, $2, $3, $4) RETURNING id, content, owner',
            values: [id, content, threadId, owner],
        };

        const result = await this._pool.query(query);

        return new AddedComment({ ...result.rows[0] });
    }
    async verifyCommentAvailability(commentId) {
        const query = {
            text: 'SELECT id FROM comments WHERE id = $1',
            values: [commentId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('komentar tidak ditemukan');
        }
    }
    async verifyCommentOwner(commentId, owner) {
        const query = {
            text: 'SELECT owner FROM comments WHERE id = $1',
            values: [commentId],
        };

        const result = await this._pool.query(query);

        if (result.rows[0].owner !== owner) {
            throw new AuthorizationError('proses gagal karena Anda bukan pemilik komentar ini');
        }
    }
    async deleteComment(commentId) {
        const query = {
            text: 'UPDATE comments SET is_delete = true WHERE id = $1',
            values: [commentId],
        };

        await this._pool.query(query);
    }
    async getCommentsByThreadId(threadId) {
        const query = {
            text: `SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete
             FROM comments
             LEFT JOIN users ON comments.owner = users.id
             WHERE comments.thread_id = $1
             ORDER BY comments.date ASC`,
            values: [threadId],
        };

        const result = await this._pool.query(query);

        return result.rows;
    }
}

export default CommentRepositoryPostgres;