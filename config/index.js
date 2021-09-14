module.exports = {
  secret: process.env.SECRET,
  api: process.env.NODE_ENV === "production" ? "https://api-tcc-ecommerce.herokuapp.com" : "http://localhost:3000",
};