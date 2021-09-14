module.exports = {
  secret: process.env.SECRET,
  api: process.env.PORT,
  //api: process.env.NODE_ENV === "production" ? process.env.PORT : "http://localhost:3000",
};