import React,{ Component } from "react"
import {Route,Redirect,Switch} from 'react-router-dom';
import app from "../containers/app"
import test from "../containers/test"
export default class router extends  Component{
      render() {
        return(
        <div>
            <Switch>
                <Route path="/app" component={app}></Route>
                <Route path = "/test" component = {test}></Route>
                <Redirect from="/" to="/app"/>
            </Switch>
        </div>
        )
    }
}