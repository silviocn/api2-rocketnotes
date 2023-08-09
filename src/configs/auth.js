module.exports = {
  jwt: {
    // secret: "ccf0702b7aa2145b8cd55baa5534bebf",
    secret: process.env.AUTH_SECRET || "default", // if the code doesn't find the AUTH_SECRET, use default
    expiresIn: "1d",
  }
}