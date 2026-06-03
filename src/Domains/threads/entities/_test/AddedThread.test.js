import { describe, test, expect } from 'vitest';
import AddedThread from '../AddedThread.js'; 

describe('an AddedThread entities', () => {
  test('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  test('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 12345,
      title: 'sebuah thread',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  test('should create AddedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.owner).toEqual(payload.owner);
  });
});