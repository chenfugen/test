import {combineReducers} from "redux"
import {add_comment,del_comment,get_comments ,DECREMENT, INCREMENT} from "./action-type";
const initComments=[];
const comments =(state=initComments,action)=>{
    switch (action.type) {
        case add_comment:
           return [action.data,...state];
        case del_comment:
            return state.filter((item,index)=>index!==action.data);
        case get_comments:
            return state=action.data;
        default:
            return state;
    }
};
const counter =(state=0,action)=> {
    switch (action.type) {
        case INCREMENT:
            return state+action.data;
        case DECREMENT:
            return state-action.data;
        default:
            return state
    }
};
export default  combineReducers({
        comments,
        counter
})
