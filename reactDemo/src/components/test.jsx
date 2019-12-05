import React,{ Component } from "react"
import PropTypes from "prop-types"
export default class Test extends  Component{
     static propTypes={
         count:PropTypes.number.isRequired,
         increment:PropTypes.func.isRequired,
         decrement:PropTypes.func.isRequired,
         incrementAsync:PropTypes.func.isRequired,
     }
    increment=()=>{
       // 1、获取增加的数量
        const  number=this.select.value*1;
        //2、调用store方法调用
         this.props.increment(number);
    };
    decrement=()=>{
        // 1、获取增加的数量
        const  number=this.select.value*1;
        //2、调用store方法调用
        this.props.decrement(number);
    };
    incrementIfAdd=()=>{
        // 1、获取增加的数量
        const  number=this.select.value*1;
        //2、获取当前count
        const count=this.props.count;
        //3、满足条件才更新状态,更新数据
        if(count%2===1){
            //2、调用store方法调用
            this.props.increment(number);
        }
    };
    incrementAsync=()=>{
        // 1、获取增加的数量
        const  number=this.select.value*1;
        //2、启动延时更新
       this.props.incrementAsync(number);
    };
      render() {
        const {count}=this.props;
        return(
        <div className="test">
            <p>click {count} times</p>
            <div>
                <select ref={select=>this.select =select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button  onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfAdd}>increment if add</button>&nbsp;
                <button onClick={this.incrementAsync}>increment if async</button>
            </div>
        </div>
        )
    }
}