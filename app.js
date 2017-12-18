/*
const express = require('express')  
const app = express()  
app.use('/',(req,res) => {  
  res.send('hello express!')  
})  
app.listen(3000,() => {  
    console.log('app listening on port 3000.')  
})  
*/

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.listen(3000, () => {
    console.log('app listening on port 3000.')
})


//myself add
// var appData = require('../src/components/json/index.json');
// var appData = require('../static/json/test.json');
var apiRoutes = express.Router();

//post 接收参数必用 begin
var bodyParser = require('body-parser');
// var multer = require('multer');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data
//post 接收参数必用 end

var appData = require(path.join(__dirname, 'dist') + '/static/json/test.json');
apiRoutes.get("/indexjson", function(req, res) { res.json(appData) })

var userData = require(path.join(__dirname, 'dist') + '/static/json/user.json');
//请求地址写法是/user?username=xxx&password=
apiRoutes.get("/user", function(req, res) {
        var flag = false;
        flag = checkUserLogin(req.query.username, req.query.password);
        res.json({ result: flag }); // res.json(userData)
    })
    //请求地址写法是/user 参数是post方式传递 username=xxx,password=
apiRoutes.post("/user0", function(req, res) {
        var flag = false;
        flag = checkUserLogin(req.body.username, req.body.password);
        res.json({ result: flag }); // res.json(userData)
    })
    //请求地址写法是/user/xx/xxx
apiRoutes.get("/user1/:username/:password", function(req, res) {
        var flag = false;
        flag = checkUserLogin(req.params.username, req.params.password);
        res.json({ result: flag }); // res.json(userData)
    })
    //请求地址写法是/user/xx&xxxx
apiRoutes.get("/user2/*", function(req, res) {
    var flag = false;
    var paramsArray = req.params[0].split("&");
    flag = checkUserLogin(paramsArray[0], paramsArray[1]);
    res.json({ result: flag }); // res.json(userData)
})

function checkUserLogin(un, pass) {
    var flag = false;
    userData.forEach((user) => {
        if (user.username === un && user.password === pass) {
            flag = true;
            return flag;
        }
    })
    return flag;
}

app.use(apiRoutes);

//myself add end