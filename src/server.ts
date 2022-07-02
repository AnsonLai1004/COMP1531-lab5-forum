import express, { json, Request, Response } from 'express';
import cors from 'cors';

// OPTIONAL: Use middleware to log (print to terminal) incoming HTTP requests
import morgan from 'morgan';

// Importing the example implementation for echo in echo.js
import { echo } from './echo';
import { PORT, SERVER_URL } from './config';

import { create, comment_f1, view, postsView, clear } from './post'

const app = express();
// Use middleware that allows for access from other domains (needed for frontend to connect)
app.use(cors());
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// (OPTIONAL) Use middleware to log (print to terminal) incoming HTTP requests
app.use(morgan('dev'));

// Root URL
app.get('/', (req: Request, res: Response) => {
  console.log('Print to terminal: someone accessed our root url!');
  res.json(
    {
      message: "Welcome to Lab05 Forum Server's root URL!",
    }
  );
});

app.get('/echo/echo', (req: Request, res: Response) => {
  // For GET/DELETE requests, parameters are passed in a query string.
  // You will need to typecast for GET/DELETE requests.
  const message = req.query.message as string;

  // Logic of the echo function is abstracted away in a different
  // file called echo.py.
  res.json(echo(message));
});

app.post('/post/create', (req: Request, res: Response) => {
  // For PUT/POST requests, data is transfered through the JSON body
  const { sender, title, content } = req.body;

  // TODO: Implement
  //console.log('Do something with:', sender, title, content);

  res.json(create(sender, title, content));
});

// TODO: Remaining routes
app.post('/post/comment', (req: Request, res: Response) => {
  // For PUT/POST requests, data is transfered through the JSON body
  const { postId, sender, comment } = req.body;
  //console.log('Do something with:', postId, sender, comment);

  // TODO: Implement
  res.json(comment_f1(postId, sender, comment));
});


app.get('/post/view', (req: Request, res: Response) => {
  const postId = parseInt((req.query.postId) as string);
  //console.log(postId);
  res.json(view(postId));
});

app.get('/posts/view', (req: Request, res: Response) => {
  // For PUT/POST requests, data is transfered through the JSON body
  // const { sender, title, content } = req.body;

  // TODO: Implement
  //console.log('Do something with:', sender, title, content);
  res.json(postsView());
});

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});
/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Starting Express Server at the URL: '${SERVER_URL}'`);
});
