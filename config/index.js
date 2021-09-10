module.exports = {
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "FY78ASDF9ADS5G9DF675GS9FGS9D734Y958734H98UT08WY34GF78SD0FG6D0SF70SDFGY45254DFG",
  api: process.env.NODE_ENV === "production" ? "https://ecommerce-api-tcc.herokuapp.com/" : "http://localhost:3000",
  loja: process.env.NODE_ENV === "proction" ? "http://localhost:8000" : "http://localhost:8000"
};