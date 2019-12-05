import React,{ Component } from "react"
import { Row, Col } from 'antd'
import PropTypes from "prop-types"
import CommentFrom from "../views/from/from"
import CommentList from "../views/list/list"
import  NavLink from "./MyNavLink"
export default class App extends  Component{
    static propTypes={
        comments:PropTypes.array.isRequired,
        addComment:PropTypes.func.isRequired,
        delComment:PropTypes.func.isRequired,
        initComment:PropTypes.func.isRequired,
    }
    // constructor(props){
    //     super(props)
    //     this.state={
    //         comments:[
    //             {username:"Tom",content:"React挺好的！"},
    //             {username:"Jack",content:"React太难了！"}
    //         ]
    //     }
    // }
    componentDidMount(){
     this.props.initComment();
    }
    //给组件添加state初始值
    // state={
    //     comments:[
    //         {username:"Tom",content:"React挺好的！"},
    //         {username:"Jack",content:"React太难了！"}
    //         ]
    // }
    // addComment=(comment)=>{
    //     const {comments}=this.state;
    //     comments.unshift(comment)
    //     //更新状态
    //     this.setState({comments})
    // }
    // delComment=(index)=>{
    //     const {comments}=this.state;
    //     comments.splice(index,1);
    //     //更新状态
    //     this.setState({comments})
    // }
    render() {
        const {comments,addComment,delComment}=this.props;
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <NavLink to="/test" >
                            <p className="theme">请发表对react的评论</p>
                        </NavLink>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={2}>
                        <CommentFrom  addComment={addComment} />
                    </Col>
                    <Col span={10} offset={1}>
                        <CommentList comments={comments} delComment={delComment}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
