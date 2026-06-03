import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../../Commons/config.js';
import AuthenticationError from '../../../../Commons/exceptions/AuthenticationError.js';

const createThreadsRouter = (handler) => {
  const router = express.Router();

  const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.auth.accessTokenKey);
      req.auth = { id: decoded.id }; 
      next();
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  };

  router.post('/', authMiddleware, handler.postThreadsHandler);
  router.get('/:threadId', handler.getThreadDetailHandler);
  router.post('/:threadId/comments', authMiddleware, handler.postCommentsHandler);
  router.delete('/:threadId/comments/:commentId', authMiddleware, handler.deleteCommentHandler); 
  router.post('/:threadId/comments/:commentId/replies', authMiddleware, handler.postRepliesHandler); 
  router.delete('/:threadId/comments/:commentId/replies/:replyId', authMiddleware, handler.deleteReplyHandler); 

  return router;
};

export default createThreadsRouter;