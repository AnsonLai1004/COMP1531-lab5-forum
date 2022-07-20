import request from 'sync-request';
import { SERVER_URL } from './config';
import { create, comment_f1, view, postsView, clear } from './post';

beforeEach(() => {
  const res = request(
    'DELETE',
    SERVER_URL + '/clear'
  );
});

function requestCreate(sender: string, title: string, content: string) {
  const res = request(
    'POST',
    SERVER_URL + '/post/create',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      json: {
        sender: sender,
        title: title,
        content: content,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}
describe('/post/create', () => {
  test('error', () => {
    expect(requestCreate('', 'abc', 'abc')).toStrictEqual({ error: expect.any(String) });
    expect(requestCreate('abc', '', 'abc')).toStrictEqual({ error: expect.any(String) });
    expect(requestCreate('abc', 'abc', '')).toStrictEqual({ error: expect.any(String) });
  });
  test('success', () => {
    expect(requestCreate('abc', 'abc', 'abc')).toMatchObject({ postId: 1 });
    expect(requestCreate('sdfdsf', 'gdfgdf', 'gfddgf')).toMatchObject({ postId: 2 });
  });
});

function requestComment(postId: number, sender: string, comment: string) {
  const res = request(
    'POST',
    SERVER_URL + '/post/comment',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      json: {
        postId: postId,
        sender: sender,
        comment: comment,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}
describe('/post/comment', () => {
  test('error', () => {
    const id = requestCreate('abc', 'abc', 'abc');
    expect(requestComment(-999, 'abc', 'agd')).toStrictEqual({ error: expect.any(String) });
    expect(requestComment(id.postId, '', 'abc')).toStrictEqual({ error: expect.any(String) });
    expect(requestComment(id.postId, 'abc', '')).toStrictEqual({ error: expect.any(String) });
  });
  test('success', () => {
    const second = requestCreate('abc', 'abc', 'abc');
    expect(requestComment(second.postId, 'addf', 'asdff')).toMatchObject({ commentId: 1 });
    expect(requestComment(second.postId, 'fds', 'fd')).toMatchObject({ commentId: 2 });
  });
});

function requestView(postId: number) {
  const res = request(
    'GET',
    SERVER_URL + '/post/view',
    {
      // Note that for PUT/POST requests, you should
      // use the key 'json' instead of the query string 'qs'
      qs: {
        postId,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}
describe('/post/view', () => {
  test('error', () => {
    expect(requestView(-999)).toStrictEqual({ error: expect.any(String) });
  });
  test('success', () => {
    const id = requestCreate('abc', 'abc', 'abc');
    expect(requestView(id.postId)).toMatchObject({
      post: {
        postId: id.postId,
        sender: 'abc',
        title: 'abc',
        timeSent: expect.any(Number),
        content: 'abc',
        comments: [],
      }
    });
  });
});

function requestViewAll() {
  const res = request(
    'GET',
    SERVER_URL + '/posts/view'
  );
  return JSON.parse(res.getBody() as string);
}
describe('/posts/view', () => {
  test('success', () => {
    const f = requestCreate('abc', 'abc', 'abc');
    const s = requestCreate('df', 'df', 'df');
    expect(requestViewAll()).toMatchObject({
      posts: [
        {
          postId: s.postId,
          sender: 'df',
          title: 'df',
          timeSent: expect.any(Number),
        },
        {
          postId: f.postId,
          sender: 'abc',
          title: 'abc',
          timeSent: expect.any(Number),
        },
      ]
    });
  });
});
