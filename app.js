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

const path = require('path')
const express = require('express')
const app = express()

//myself add two start
var cookieParser = require("cookie-parser");
var session = require('express-session');
app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));
//myself add two end

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
    var flag = 0; //账号不存在
    var user1 = null;
    for (var i = 0; i < userData.length; i++) {
        var user0 = userData[i];
        if (user0.username === un && user0.password === pass) {
            flag = 1; //账号存在
            user1 = user0;
            break;
        }
    }
    // userData.forEach((user0) => {
    //     if (user0.username === un && user0.password === pass) {
    //         flag = 1; //账号存在
    //         user1 = user0;
    //         break;//foreach中的break报错
    //         // return { retCode: flag, user: user0, c: { name: user0.username } };
    //     }
    // })
    return { retCode: flag, user: user1 };

}

//请求地址写法是/user 参数是post方式传递 username=xxx,password=
apiRoutes.post("/login", function(req, res) {
    var result = checkUserLogin(req.body.username, req.body.password);
    if (result.retCode == 1) {
        req.session.user = result.user;
    }
    res.json(result); // res.json(userData)
})

//请求地址写法是/user 参数是post方式传递 username=xxx,password=
apiRoutes.post("/checklogin", function(req, res, next) {
    if (req.session.user) {
        res.json({ retCode: 1, user: req.session.user }); //已登录
    } else {
        // var result = checkUserLogin(req.body.username, req.body.password);
        res.json({ retCode: 0, user: null }); //未登录
        // res.json(userData)
    }
})

apiRoutes.post("/loginOut", function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.json({ retCode: 0, retMsg: '退出登录失败' });
            return;
        }
        // req.session.loginUser = null;
        // res.clearCookie(identityKey);
        // res.redirect('/newlogin');
        res.json({ retCode: 1, retMsg: '退出登录成功' });
    });
})


app.use(apiRoutes);

//myself add end