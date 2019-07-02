var express = require('express')
var history = require('connect-history-api-fallback')


const app = express()
var apiRoutes = express.Router()



/*apiRoutes.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/




app.use('/', apiRoutes)

app.use(history())

app.use(express.static('./dist'))  //静态资源入口

var port = 5000

module.exports = app.listen(port, function (err) {
    if(err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port  +'\n')
})