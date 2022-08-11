import { application } from 'express';
import request, { HttpVerb } from 'sync-request';

import { SERVER_URL } from './config';

function requestHelper(method: HttpVerb, path: string, payload: object) {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json });
  return JSON.parse(res.getBody('utf-8'));
}
//================================================================================
function requestPostCreate(sender:string, title:string, content:string) {
  return requestHelper('POST', '/post/create', { sender, title, content});
}
function requestCommentCreate(postId:number, sender:string, comment:string) {
  return requestHelper('POST', '/post/comment', { postId, sender, comment});
}
function requestPostView(postId:number) {
  return requestHelper('GET', '/post/view', { postId});
}
//================================================================================

test('create', () => {
    expect(requestPostCreate('','red and black','long long ago')).toStrictEqual({error: expect.any(String)});
    expect(requestPostCreate('anyone','','long long ago')).toStrictEqual({error: expect.any(String)});
    expect(requestPostCreate('anyone','aaa','')).toStrictEqual({error: expect.any(String)});
    expect(requestPostCreate('anyone','red and black','long long ago')).toStrictEqual({ postId: expect.any(Number) });
});

test('comment', () => {
    let id1 = requestPostCreate('anyone','red and black','long long ago');
    let id2 = requestPostCreate('Hayden','javascript','blablabla');
    expect(requestCommentCreate(id1.postId,'red and black','')).toStrictEqual({error: expect.any(String)});
    expect(requestCommentCreate(id1.postId,'','long long ago')).toStrictEqual({error: expect.any(String)});
    expect(requestCommentCreate(9989,'aaa','')).toStrictEqual({error: expect.any(String)});
    expect( (requestCommentCreate(id1.postId,'me','goodone'))).toStrictEqual({ commentId: expect.any(Number) });
});
test('view', () => {
  let id1 = requestPostCreate('anyone','red and black','long long ago');
  let id2 = requestPostCreate('Hayden','javascript','blablabla');
  let cid1 = requestCommentCreate(id1.postId,'me','goodone');
  let cid2 = requestCommentCreate(id2.postId,'me','what the hell!')
  expect( requestPostView(id1.postId)).toStrictEqual({ post: expect.any(Object) });
});
// test('empty input', () => {
//     const res = request(
//       'POST',
//       SERVER_URL + '/post/create',
//       {
//         body: '{"sender":"","title":"How to write","content":"write it carefully!"}',
//       }
//     );
//     const data = JSON.parse(res.getBody() as string);
//     expect(data).toStrictEqual({  error: expect.any(String) });
//   });

//   test('comment success direct', () => {
//     const res = request(
//       'POST',
//       SERVER_URL + '/post/comment',
//       {
//         body: '{"postId":1,"comment":"too hollow","comment_sender":"Amy"}',
//       }
//     );
//     const data = JSON.parse(res.getBody() as string);
//     expect(data).toStrictEqual({ commentId: expect.any(Number) });
//   });
//   test('comment success direct', () => {
//     const res = request(
//       'POST',
//       SERVER_URL + '/post/comment',
//       {
//         body: '{"postId":1011,"comment":"too hollow","comment_sender":"Amy"}',

//       }
//     );
//     const data = JSON.parse(res.getBody() as string);
//     expect(data).toStrictEqual({  error: expect.any(String) });
//   });

