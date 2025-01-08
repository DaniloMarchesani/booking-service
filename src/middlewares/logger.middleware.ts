import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, next: NextFunction) {
    const logger = new Logger();
    if (req.method === 'GET') {
      logger.log('GET Request to: ' + req.originalUrl);
      if (req.query) {
        logger.log('Query Params: ' + JSON.stringify(req.query));
      }
    }
    if (req.method === 'POST') {
      logger.log('POST Request to: ' + req.originalUrl);
      if (req.body) {
        logger.log('Body: ' + JSON.stringify(req.body));
      }
    }

    if (req.method === 'PUT') {
      logger.log('PUT Request to: ' + req.originalUrl);
      if (req.body) {
        logger.log('Body: ' + JSON.stringify(req.body));
      }
    }

    if (req.method === 'DELETE') {
      logger.log('DELETE Request to: ' + req.originalUrl);
    }
    next();
  }
}
