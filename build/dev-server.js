require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
    // automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)


var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


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

var appData = require(path.resolve(__dirname, '../static') + '/json/test.json');
apiRoutes.get("/indexjson", function(req, res) { res.json(appData) })

var userData = require(path.resolve(__dirname, '../static') + '/json/user.json');
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


var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
        // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}