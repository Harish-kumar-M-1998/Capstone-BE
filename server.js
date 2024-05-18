const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({
    origin: "https://cleanease-capstone-fe.netlify.app",
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const dbConfig = require('./db')

const cleaningServiceRoutes = require('./routes/cleaningserviceroute');

const userroutes = require('./routes/userroutes');
const userdataroutes = require ('./routes/userdataroute')
const quoteroute =require('./routes/quote')
const ratingroute =require('./routes/rating&review')
const bookingroute = require('./routes/bookinroutes')
const middleware = require('./routes/pro')


app.use('/api/cleaningservices', cleaningServiceRoutes);
app.use('/api/users',userroutes)
app.use('/api/userdata', userdataroutes)
app.use('/api/quote',quoteroute)
app.use('/api/rating',ratingroute)
app.use('/api/bookings',bookingroute)
app.use('/api',middleware)

app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
            }
            .container {
                text-align: center;
                margin-top: 100px;
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1> API Running</h1>
            
        </div>
    </body>
    </html>
    `;
    res.status(200).send(htmlResponse);
});






const port = process.env.PORT || 3002 ;

app.listen(port , () => console.log(`Server is running at ${port}`));