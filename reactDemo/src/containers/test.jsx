import {connect} from "react-redux"
import {increment,decrement,incrementAsync} from "../redux/actions"
import  Test from "../components/test"

export default connect(
    state=>({count:state.counter}),
    {increment,decrement,incrementAsync}
)(Test)