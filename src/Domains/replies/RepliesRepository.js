class RepliesRepository {
  async addReply(newReply, commentId, owner) {
    throw new Error('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyReplyAvailability(replyId) {
    throw new Error('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyReplyOwner(replyId, owner) {
    throw new Error('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteReply(replyId) {
    throw new Error('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRepliesByThreadId(threadId) {
    throw new Error('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

export default RepliesRepository;