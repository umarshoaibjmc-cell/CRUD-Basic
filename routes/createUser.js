// =====================================================================================
// CREATE USER
// =====================================================================================  
const fs = require("fs/promises");
const path = require("path");

const createUser = async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const newUser = JSON.parse(body);
      const filePath = path.resolve(__dirname, "../users.txt");

      const allUsersText = await fs.readFile(filePath, "utf8");

      const allUsers = allUsersText.split("\r\n");
      const newId = allUsers.length + 1;

      const newUserLine = `${newUser.firstName};${newUser.lastName};${newUser.age}`;

      await fs.appendFile(filePath, `\r\n${newUserLine}`);

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 201;

      res.end(
        JSON.stringify({
          message: "User Created Successfully" ,
          id: newId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          age: newUser.age,
        }),
      );
    });
    return;
};

module.exports = createUser;