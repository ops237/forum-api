import { describe, test, expect, beforeEach, afterAll } from 'vitest';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import pool from '../../database/postgres/pool.js';
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres.js';
import NotFoundError from '../../../Commons/exceptions/NotFoundError.js';

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getThreadById function', () => {
    test('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(repository.getThreadById('thread-xxx')).rejects.toThrowError(NotFoundError);
    });

    test('should return thread detail correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', title: 'sebuah thread', owner: 'user-123' });

      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await repository.getThreadById('thread-123');

      // Assert
      expect(thread).toBeDefined();
      expect(thread.id).toEqual('thread-123');
      expect(thread.username).toEqual('dicoding');
      expect(thread.title).toEqual('sebuah thread');
    });
  });
});