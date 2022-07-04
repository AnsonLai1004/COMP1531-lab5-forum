interface post {
  postId: number;
  sender: string;
  title: string;
  timeSent: number;
  content: string;
  comments: comments[];
};

interface comments {
  commentId: number;
  sender: string;
  comment: string;
  timeSent: number;
};
/*
const Post: post = {
  postId,
  sender,
  title,
  timeSent,
  content,
  comments = [];
};
*/

let Posts: post[] = [];

export function create(sender: string, title: string , content: string) {
  if (sender === '' || title === '' || content === '') {
    return { error: 'passed in empty string' };
  }
  let postId = 1;
  if (Posts.length === 0) {
  } else {
    postId = Posts.length + 1;
  }
  const Post = {
    postId: postId,
    sender: sender,
    title: title,
    timeSent: Math.floor(Date.now() / 1000),
    content: content,
    comments: [], 
  }
  Posts.push(Post);
  return { postId: postId };
}

export function comment_f1(postId: number, sender: string, comment: string) {
  if (sender === '' || comment === '') {
    return { error: 'passed in empty string' };
  }
  for (let post of Posts) {
    if (postId === post.postId) {
      let cId = 1;
      if (post.comments.length === 0) {
      } else {
        cId = post.comments.length + 1;
      }
      post.comments.push({
        commentId: cId,
        sender: sender,
        comment: comment,
        timeSent: Math.floor(Date.now() / 1000),
      });
      return { commentId: cId };
    }
  }
  return { error: 'postId does not refer to a valid post' };
}

export function view(postId: number) {
  for (let post of Posts) {
    if (postId === post.postId) {
      let result = post;
      let c_sort = post.comments.reverse()
      result.comments = c_sort;
      return { post: result };
    }
  }
  return { error: 'postId does not refer to a valid post' };
}

export function postsView() {
  let reverse = Posts.reverse();
  let results = []
  for (let element of reverse) {
    let obj = {
      postId: element.postId,
      sender: element.sender,
      title: element.title,
      timeSent: element.timeSent,
    }
    results.push(obj);
  };
  return { posts: results };
}

export function clear() {
  Posts = [];
}
