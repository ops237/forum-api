class ThreadsRepository {
    async addThread(newThread, owner) {
        throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async verifyThreadAvailability(threadId) {
        throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async getThreadById(threadId) {
        throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

export default ThreadsRepository;