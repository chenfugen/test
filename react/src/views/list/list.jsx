import React,{ Component } from "react"
import PropTypes from "prop-types"
import CommentItem from "../item/item"

export default class CommentList extends  Component{
    //给组件指定属性
    static propTypes={
        comments:PropTypes.array.isRequired,
        delComment:PropTypes.func.isRequired,
    }
      render() {
          const {comments,delComment}=this.props;
          const display=comments.length>0?"none":"block";
        return(
            <div>
                <p className="headline">评论回复：</p>
                <p  className="hint" style={{display}}>暂无评论!!请添加</p>
                {
                    comments.map((c,index)=><CommentItem comment={c} key={index} index={index} delComment={delComment} />)
                }
            </div>
        )
    }
}