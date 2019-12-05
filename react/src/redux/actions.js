import {add_comment,del_comment,get_comments ,DECREMENT, INCREMENT} from "./action-type";
import Axios from "../axios/index";
export  const addComment=(comment)=>({
    type:add_comment,data:comment
})

export const delComment=(index)=>({
    type:del_comment,data:index
})

export const getComments=(comments)=>({
    type:get_comments,data:comments
})

export const initComment=()=>{
    return dispatch=>{
        Axios.get("comments").then((res)=>{
            const comments=res;
            console.log(res)
            dispatch(getComments(comments))
        })
    }
}

//test页面
export const  increment=(number)=>({
    type:INCREMENT,data:number
})

export const  decrement=(number)=>({
    type:DECREMENT,data:number
})
//异步action
export const  incrementAsync=(number)=>{
    return dispatch=>{
        setTimeout(()=>{
            //1s之后才去分发一个增加的action
            dispatch(increment(number))
        },1000)
    }
}