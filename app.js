const express = require("express");
const path = require("path")
const passport = require("passport"); 
const session = require("express-session"); 
const MongoStore = require('connect-mongo'); 
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorController"); 
const orderRouter = require("./routes/orderRoute")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes");
const viewRouter = require("./routes/viewRoute")


dotenv.config({ path: "./config.env" });
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MongoStore({
    mongoUrl: process.env.DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
      ),
    collectionName: 'sessions',
    autoRemove: 'native', 
    autoRemoveInterval: 10,  
}) 
app.use(session({
    secret:process.env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: true, 
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
    }
}))


require('./utils/passport')

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use("/", viewRouter); 
app.use("/api/v1/products", productRouter);
app.use("/account", userRouter);
app.use("/order",orderRouter) 

// Handling request to incorrect routes
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} does not exist on this app.`, 404));
});

app.use(globalError); 
module.exports = app;
