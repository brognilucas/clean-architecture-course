//@ts-nocheck
import express from 'express';
import { Request, Response } from 'express';
import HttpServer from './HttpServer';
export default class ExpressAdapter implements HttpServer {
  private app: any;

  constructor() {
    const app = express();
    app.use(express.json());
    this.app = app;
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }

  on(method: string, path: string, handler: Function) {
    this.app[method](path, async (req: Request, res: Response) => {
      try {
        const output = await handler(req.params, req.body);
        if (method === 'post'){ 
          return res.status(201).json(output);
        }
        return res.json(output);
      } catch (error) {
        return res.status(422).json({ message: error.message });
      }
    });
  }

}