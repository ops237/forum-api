import { describe, test, expect, vi } from 'vitest';
import ThreadRepository from '../../../Domains/threads/ThreadsRepository.js';
import CommentRepository from '../../../Domains/comments/CommentsRepository.js';
import RepliesRepository from '../../../Domains/replies/RepliesRepository.js'; 
import GetThreadDetailUseCase from '../GetThreadDetailUseCase.js';

describe('GetThreadDetailUseCase', () => {
  test('should orchestrate the get thread detail action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';

    const mockThreadDetail = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
    };

    const mockComments = [
      {
        id: 'comment-1',
        username: 'johndoe',
        date: '2021-08-08T07:22:33.555Z',
        content: 'sebuah comment',
        is_delete: false,
      },
      {
        id: 'comment-2',
        username: 'dicoding',
        date: '2021-08-08T07:26:21.338Z',
        content: 'sebuah comment',
        is_delete: true, 
      },
    ];

    const mockReplies = [
      {
        id: 'reply-1',
        comment_id: 'comment-1',
        username: 'johndoe',
        date: '2021-08-08T07:59:48.766Z',
        content: 'sebuah balasan',
        is_delete: false,
      },
      {
        id: 'reply-2',
        comment_id: 'comment-1',
        username: 'dicoding',
        date: '2021-08-08T08:07:01.522Z',
        content: 'sebuah balasan',
        is_delete: true, 
      }
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new RepliesRepository(); 

    mockThreadRepository.getThreadById = vi.fn(() => Promise.resolve(mockThreadDetail));
    mockCommentRepository.getCommentsByThreadId = vi.fn(() => Promise.resolve(mockComments));
    mockReplyRepository.getRepliesByThreadId = vi.fn(() => Promise.resolve(mockReplies)); 

    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository, 
    });

    // Action
    const threadDetail = await getThreadDetailUseCase.execute(threadId);

    // Assert
    expect(threadDetail).toEqual({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-1',
          username: 'johndoe',
          date: '2021-08-08T07:22:33.555Z',
          content: 'sebuah comment',
          replies: [ 
            {
              id: 'reply-1',
              content: 'sebuah balasan',
              date: '2021-08-08T07:59:48.766Z',
              username: 'johndoe',
            },
            {
              id: 'reply-2',
              content: '**balasan telah dihapus**', 
              date: '2021-08-08T08:07:01.522Z',
              username: 'dicoding',
            }
          ]
        },
        {
          id: 'comment-2',
          username: 'dicoding',
          date: '2021-08-08T07:26:21.338Z',
          content: '**komentar telah dihapus**', 
          replies: [] 
        },
      ],
    });

    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByThreadId).toHaveBeenCalledWith(threadId);
  });
});