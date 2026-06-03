import { describe, test, expect, beforeEach, afterAll } from 'vitest';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import pool from '../../database/postgres/pool.js';
import NewThread from '../../../Domains/threads/entities/NewThread.js';
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres.js';

describe('ThreadRepositoryPostgres', () => {
    beforeEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        test('should persist new thread and return added thread correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });

            const newThread = new NewThread({
                title: 'sebuah thread',
                body: 'sebuah body thread',
            });

            const fakeIdGenerator = () => '123';
            const repository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const addedThread = await repository.addThread(newThread, 'user-123');

            // Assert
            const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
            expect(threads).toHaveLength(1);
            expect(addedThread.id).toEqual('thread-123');
            expect(addedThread.title).toEqual('sebuah thread');
            expect(addedThread.owner).toEqual('user-123');
        });
    });
});