import { describe, test, expect } from 'vitest';
import NewThread from '../NewThread.js';

describe('a NewThread entities', () => {
  test('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  test('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
      body: 12345,
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  test('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
      body: 'sebuah body thread',
    };

    // Action
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread.title).toEqual(payload.title);
    expect(newThread.body).toEqual(payload.body);
  });
});