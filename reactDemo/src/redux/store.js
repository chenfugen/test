import {createStore,applyMiddleware} from "redux" //redux工具
import thunk from "redux-thunk"   //异步中间件
import {composeWithDevTools} from "redux-devtools-extension"  //redux调试工具拓展
import reducers from '../redux/reducers'
const store=createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);
export default store