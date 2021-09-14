module.exports = {
secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "FY78ASDF9ADS5G9DF675GS9FGS9D734Y958734H98UT08WY34GF78SD0FG6D0SF70SDFGY45254DFG",
  api: process.env.NODE_ENV === "production" ? process.env.APP_URL : "http://localhost:3000",
};