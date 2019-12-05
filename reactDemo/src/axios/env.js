const env=process.env.NODE_ENV;
let Process;
if(env==="production") {
    Process={
        "baseURL":"http://localhost:3001/",
        "webAPI":"http://localhost:3000/"
    };
}else if(env==="development"){
    Process={
        "baseURL":"http://localhost:3001/",
        "webAPI":"http://localhost:3000/"
    };
}else{
    Process={
        "baseURL":"http://localhost:3001/",
        "webAPI":"http://localhost:3000/"
    };
}
export default  Process;
