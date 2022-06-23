/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const express = require('express');
const app = express();
///const morgan = require('morgan');
const mongoose = require("mongoose");

// Get all the routes
const authRoutes = require('./src/routes/AuthRoute');
const stripeRoutes = require('./src/routes//StripeRoute');
const userRoutes = require('./src/routes/UserRoute');
const categoryRoutes = require('./src/routes/CategoryRoute');
const productRoutes = require('./src/routes/ProductRoute');
const carouselRoutes = require('./src/routes/CarouselRoute');
const cartRoutes = require('./src/routes/CartRoute');
const orderRoutes = require('./src/routes/OrderRoute');

const cors = require("cors");
require("dotenv/config");
///const authJwt = require('./helpers/jwt');
///const errorHandler = require('./helpers/error-handler');

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});*/
app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
///app.use(morgan('tiny'));
///app.use(authJwt());
///app.use(errorHandler);
///app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//Routes
///const authRoutes = require("./auth/authenticator");
///const categoriesRoutes = require("./routes/categories");
///const productsRoutes = require("./routes/products");
///const usersRoutes = require("./routes/user");
///const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/payment`, stripeRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/carousel`, carouselRoutes);
app.use(`${api}/carts`, cartRoutes);
app.use(`${api}/orders`, orderRoutes);

//Database connection
const mongodbURL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_USER_PASS + '@unipr.g2qmr.mongodb.net/' + process.env.DATABASE + '?retryWrites=true&w=majority'

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('We are using database: ' + process.env.DATABASE);
        console.log('Database connection is ready...');
    })
    .catch((err) => {
        console.log('Database connection is failled...\n', err);
    })

//Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('******************************************'
        + `\n    Server is running on the port ${port}` +
        '\n******************************************');
})