const mongoose = require("mongoose");

const dbConnection = mongoose
  .connect("mongodb://localhost/testdb", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

module.exports = dbConnection;
