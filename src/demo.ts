import { getData,setData } from './dataStore';
let auto_increment = 0;
let auto_increment_c = 0;
export function create(sender:string, title:string, content:string) {
    if(sender === ""){
        return { error: "cannot echo 'echo'!" };
    }
    if(title === ""){
        return { error: "cannot echo 'echo'!" };
    }
    if(content=== ""){
        return { error: "cannot echo 'echo'!" };
    }
    auto_increment++;
    let obj ={
        postId:auto_increment,
        sender:sender,
        title:title,
        content:content,
        timesent:new Date().getTime(),
        comments:[],
    }
    let curData = getData();
    curData.post.push(obj);
    setData(curData);
    return {
        postId:auto_increment,
    }
}

export function commentV1(postId:number,sender:string, comment:string){
    let curData = getData();
    let check = false;
    for(let i =0; i < curData.post.length; i++){
        if(curData.post[i].postId === postId){
            check = true;
        }
    }
    if(check === false){
        return { error: "postId is not valid" };  
    }
    if(sender === ''){
        return { error: "cannot echo 'echo'!" };
    }
    if(comment === ''){
        return { error: "cannot echo 'echo'!" };
    }
    auto_increment_c++;
    let obj = {
        commentId:auto_increment_c,
        sender: sender,
        comment:comment,
        timesent:new Date().getTime(),
    }
    for(let i =0; i < curData.post.length; i++){
        if(curData.post[i].postId === postId){
            curData.post[i].comments.unshift(obj);
        }
    }
    setData(curData);
    return {
    commentId:obj.commentId,
    }

}

export function view_single(id:Number){
    let curData = getData();
    for(let i =0;i<curData.post.length; i++){
        if(curData.post[i].postId === id){
            return {post: curData.post[i]};
        }
    }
    return { error: "cannot echo 'echo'!" };
}

export function view_all(){
    let curData = getData();
    let newArr = [];
    newArr = curData.post.reverse();
    let a = [];
    for(let i =-0; i < newArr.length;i++){
        let obj ={
            postId: newArr[i].postId,
            sender: newArr[i].sender, 
            title: newArr[i].title, 
            timeSent: newArr[i].timeSent
        }
        a.push(obj)
    }
    return {posts:a};
}

export function clear(){
    let curData = getData();
    curData.post = [];
    setData(curData);
}