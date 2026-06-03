import { describe, test, expect, vi } from 'vitest';
import ThreadsRepository from '../../../Domains/threads/ThreadsRepository.js';
import AddedThread from '../../../Domains/threads/entities/AddedThread.js';
import AddThreadUseCase from '../AddThreadUseCase.js';

describe('AddThreadUseCase', () => {
  test('should orchestrate the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'sebuah body thread',
    };
    const owner = 'user-123';

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner,
    });

    const mockThreadRepository = new ThreadsRepository();

    mockThreadRepository.addThread = vi.fn(() => Promise.resolve(mockAddedThread));

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload, owner);

    // Assert
    expect(addedThread).toStrictEqual(mockAddedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith({
      title: useCasePayload.title,
      body: useCasePayload.body,
    }, owner);
  });
});