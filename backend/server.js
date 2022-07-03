/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const express = require('express');
const app = express();
///const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// Get all the routes
const authRoutes = require('./src/routes/AuthRoute');
const userRoutes = require('./src/routes/UserRoute');
const categoryRoutes = require('./src/routes/CategoryRoute');
const productRoutes = require('./src/routes/ProductRoute');
const orderRoutes = require('./src/routes/OrderRoute');
const carouselRoutes = require('./src/routes/CarouselRoute');
const stripeRoutes = require('./src/routes/StripeRoute');

require("dotenv/config");

const cors = require("cors");
app.use(cors());


//Middleware
app.use(bodyParser.json({ limit: '50mb' }))

const api = process.env.API_URL;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/orders`, orderRoutes);
app.use(`${api}/carousels`, carouselRoutes);
app.use(`${api}/stripe`, stripeRoutes);

//Database connection
const mongodbURL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_USER_PASS + '@unipr.g2qmr.mongodb.net/' + process.env.DATABASE + '?retryWrites=true&w=majority'

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('We are using database: ' + process.env.DATABASE);
        console.log('Database connection is ready...');
    })
    .catch((err) => {
        console.log('Database connection failled...\n', err);
    })

//Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('******************************************'
        + `\n    Server is running on the port ${port}` +
        '\n******************************************');
})