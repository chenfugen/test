import React,{ Component } from "react"
import PropTypes from "prop-types"
import {Modal, Button } from "antd"
const { confirm } = Modal;
export default class CommentList extends  Component{
    //给组件指定属性
    static propTypes={
        comment:PropTypes.object.isRequired,
        delComment:PropTypes.func.isRequired,
        index:PropTypes.number.isRequired,
    }
    handerDelete=(index)=>{
        const {comment,delComment}=this.props;
        confirm({
            title: '提示',
            content: '你确定要删除'+comment.username +'的评论吗',
            onOk() {
               delComment(index)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        const {comment,index}=this.props;
        return(
            <div>
                <div className="comments">
                    <p className="userName">{comment.username}说：</p>
                    <Button className="posRight" onClick={this.handerDelete.bind(this,index)}>删除</Button>
                    <p className="comment">{comment.content}</p>
                </div>
            </div>
        )
    }
}