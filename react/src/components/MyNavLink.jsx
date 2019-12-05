import React,{ Component } from "react"

import  {NavLink} from "react-router-dom"

export default class MyNavLink extends  Component{
      render() {
        return(
            // 将外部所有属性传递给Nalink
           // <NavLink {...this.props} activeClassName="active"/>
            <NavLink {...this.props}/>
        )
    }
}