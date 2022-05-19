import express, { Request, Response } from 'express';
import cors from 'cors';

import morgan from 'morgan';

import { echo } from './echo';
import errorHandler from './middleware';
import { postCreate, postComment, postView, postsView, clear } from './forum';
import { PORT, SERVER_URL } from './config';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  console.log('Print to terminal: someone accessed our root url!');
  res.json(
    {
      message: "Welcome to Reference Implementation's root URL!",
    }
  );
});

app.get('/echo/echo', (req: Request, res: Response) => {
  const message = req.query.message;
  res.json(echo(message as string));
});

app.post('/post/create', (req: Request, res) => {
  console.log('Post create');
  const { sender, title, content } = req.body;
  res.json(postCreate(sender, title, content));
});

app.post('/post/comment', (req: Request, res: Response) => {
  console.log('Post comment');
  const { postId, sender, comment } = req.body;
  res.json(postComment(postId, sender, comment));
});

app.get('/post/view', (req: Request, res: Response) => {
  console.log('Post viewed');
  res.json(postView(parseInt(req.query.postId as string)));
});

app.get('/posts/view', (req: Request, res: Response) => {
  console.log('Posts viewed');
  res.json(postsView());
});

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Local URL: '${SERVER_URL}'`);
});
