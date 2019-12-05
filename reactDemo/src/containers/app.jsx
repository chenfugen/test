import {connect} from "react-redux"
import {addComment,delComment,initComment} from "../redux/actions"
import  App from "../components/app"

export default connect(
    state=>({comments:state.comments}),
    {addComment,delComment,initComment}
)(App)