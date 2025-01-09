import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP', { timestamp: true });
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const elapsedTime = Date.now() - startTime;

      if (statusCode === (HttpStatus.UNAUTHORIZED || HttpStatus.NOT_FOUND)) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - ${elapsedTime}ms`,
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} - ${elapsedTime}ms`,
        );
      }
    });
    next();
  }
}
