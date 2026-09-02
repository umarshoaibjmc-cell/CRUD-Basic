// =====================================================================================
// UPDATE USER by PUT
// =====================================================================================

const fs = require("fs/promises");
const path = require("path");

const updateUser = async (req, res) => {
  const id = Number(req.url.split("/")[2]);
  const filePath = path.resolve(__dirname, "../users.txt");

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const updateData = JSON.parse(body);

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

    updateData.firstName = String(updateData.firstName).replace(/;/g, "");
    updateData.lastName = String(updateData.lastName).replace(/;/g, "");
    updateData.age = Number(String(updateData.age).replace(/;/g, ""));

    const updatedUser = `${updateData.firstName};${updateData.lastName};${updateData.age}`;

    allUsers[id - 1] = updatedUser;

    await fs.writeFile(filePath, allUsers.join("\r\n"));

    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "User Updated Successfully",
        id: Number(id),
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        age: updateData.age,
      }),
    );
  });
  return;
};

module.exports = updateUser;
