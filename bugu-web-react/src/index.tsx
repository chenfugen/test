import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider, Modal } from 'antd'   //引入ui框架
import 'antd/dist/antd.css' //引入ui框架样式
import zhCN from 'antd/es/locale/zh_CN'        //引入ui框架字体
import reportWebVitals from './reportWebVitals'; //函数性能测试
import * as serviceWorker from './serviceWorker' //项目离线缓存，网络恢复
import { createHashHistory } from 'history' //管理路由
import store from './store'
import { Provider } from 'react-redux'
import './mock'   //引入mock
const history = createHashHistory()   //路由监听
history.listen(() => {
  Modal.destroyAll()    //模块销毁
})

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()