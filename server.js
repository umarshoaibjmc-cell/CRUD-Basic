const http = require('node:http');

const route_404 = require('./routes/_404');
const routeUser = require('./routes/user');
const getAllUsers = require('./routes/allUsers');
const createUser = require('./routes/createUser');
const updateUser = require('./routes/updateUser');
const updateData = require('./routes/updateUser2')
const deleteUser = require('./routes/deleteUser');


const newServer = http.createServer(async function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const url = req.url;


        if (req.method === 'GET' && url === '/users') {
            await getAllUsers(req, res);
        }
        else if (req.method === 'GET' && url.startsWith('/user/')) {
            await routeUser(req, res);
        }
        else if (req.method === 'POST' && url === "/user") {
            await createUser(req, res);
        }
        else if (req.method === 'PUT'&& url.startsWith('/user/')) {
            await updateUser(req, res);
        }
        else if (req.method === 'PATCH' && url.startsWith('/user/')) {
            await updateData(req, res);
        }
        else if(req.method === 'DELETE' && url.startsWith('/user/')) {
            await deleteUser(req, res);
        }
        else {
            route_404(req, res);
        }
    return;
})

newServer.listen(4001);
console.log("Server is running at http://localhost:4001");