import React,{ Component } from "react"
import PropTypes from "prop-types"
import { Modal, Button,Input } from 'antd';
const { TextArea } = Input;
export default class CommentFrom extends  Component{
    //给组件指定属性
    static propTypes={
        addComment:PropTypes.func.isRequired,
    }
    state={
        username:"",
        content:""
    }
    handleSubmit=(event)=>{
        //收集数据,封装comment对象
       const comment=this.state;
        if(comment.username===""){
            Modal.error({
                title: '提示',
                content: '请填写用户姓名',
            });
            return false;
        }
        if(comment.content===""){
            Modal.error({
                title: '提示',
                content: '请填写评论内容',
            });
            return false;
        }
       this.props.addComment(comment);
        //清除输入
        this.setState({
            username:"",
            content:""
        })
   }
    handleUsenameChange=(event)=>{
        const username=event.target.value;
        this.setState({ username });
    }
    handleContentChange=(event)=>{
        const content=event.target.value;
        this.setState({ content });
    }
      render() {
        const {username,content}=this.state;
        return(
        <div>
          <div className="cell">
            <p className="title">用户名</p>
            <Input placeholder="用户名" size="large"  value={username} onChange={this.handleUsenameChange} />
          </div>
          <div className="cell">
             <p className="cell">评论内容</p>
             <TextArea rows={8} placeholder="评论内容" size="large"  value={content} onChange={this.handleContentChange} />
          </div>
            <div className="cell">
                <Button className="right" onClick={this.handleSubmit}>提交</Button>
            </div>
        </div>
        )
    }
}