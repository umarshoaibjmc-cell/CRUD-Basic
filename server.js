const http = require('node:http');

const route_404 = require('./routes/_404');
const routeUser = require('./routes/user');
const getAllUsers = require('./routes/allUsers')

const newServer = http.createServer(async function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    const url = req.url;

    switch (url) {
        case '/users':
            await getAllUsers(req, res);
            break;
 default:
        if (url.startsWith('/user/')) {
            await routeUser(req, res);
        } else {
            route_404(req, res);
        }
        break;
    }
    return;
})

newServer.listen(4001);
console.log("Server is running at http://localhost:4001");