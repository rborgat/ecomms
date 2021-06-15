const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DbInfo = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const DBOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connection = mongoose
  .connect(DbInfo, DBOptions)
  .then(() => console.log("Db connects!"));


const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = connection; 
 process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
 
