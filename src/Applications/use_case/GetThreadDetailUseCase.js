class GetThreadDetailUseCase {
    constructor({ threadRepository, commentRepository, replyRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
        this._replyRepository = replyRepository;
    }

    async execute(threadId) {
        const thread = await this._threadRepository.getThreadById(threadId);
        const comments = await this._commentRepository.getCommentsByThreadId(threadId);
        const replies = await this._replyRepository.getRepliesByThreadId(threadId);
        
        const mappedComments = comments.map((comment) => {
            const filteredReplies = replies
                .filter((reply) => reply.comment_id === comment.id)
                .map((reply) => ({
                    id: reply.id,
                    content: reply.is_delete ? '**balasan telah dihapus**' : reply.content,
                    date: reply.date,
                    username: reply.username,
                }));

            return {
                id: comment.id,
                username: comment.username,
                date: comment.date,
                replies: filteredReplies, 
                content: comment.is_delete ? '**komentar telah dihapus**' : comment.content,
            };
        });

        return { ...thread, comments: mappedComments };
    }
}

export default GetThreadDetailUseCase;