const fs = require('fs/promises');
const path = require('path');

const getUser = async (req, res) => {
    const allUsersText = await fs.readFile(path.resolve(__dirname, '../users.txt'), 'utf8');
    const allUsers = allUsersText.split('\r\n');

    console.log(JSON.stringify(req.url, null, 2, false))
    const id = req.url.split('/')[2];


    let user = null;
    if (allUsers[id - 1] !== undefined) {
        user = allUsers[id - 1];
        console.log(user);
    }

    if (user === null) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode=404;
        res.end(JSON.stringify({
            message: 'user not found'
        }));
        return;
    }
    const split = user.split(";");
    const response = {
        firstName: split[0],
        lastName: split[1],
        age: Number(split[2])
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}

module.exports = getUser;