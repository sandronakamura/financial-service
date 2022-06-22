const cfg = () => {
  return {
    port: "3001",
    db_path: "mongodb+srv://sandro:sandro123@eyes4u.azjaj.mongodb.net/25MOB",
    jwt_secret: "F!@P",
    jwt_expires: "2d",
  };
};

module.exports = cfg();
