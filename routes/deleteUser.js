const fs = require("fs/promises");
const path = require("path");

const deleteData = async (req, res) => {

  const id = Number(req.url.split("/")[2]);

  const filePath = path.resolve(__dirname, "../users.txt");

    const allUsersText = await fs.readFile(filePath, "utf8");
    const allUsers = allUsersText.split("\r\n");

    if (allUsers[id - 1] === undefined) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;

      res.end(
        JSON.stringify({
          message: "user not found",
        }),
      );
      return;
    }

    allUsers.splice(id -1 , 1);

    await fs.writeFile(filePath, allUsers.join("\r\n"));

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    res.end(
        JSON.stringify({
            message:"user Deleted",
        }),
    );
  
  return;
};

module.exports = deleteData;
