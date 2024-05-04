

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
const dbConfig = require('./db')

const cleaningServiceRoutes = require('./routes/cleaningserviceroute');

const userroutes = require('./routes/userroutes');
const userdataroutes = require ('./routes/userdataroute')
const quoteroute =require('./routes/quote')

app.use('/api/cleaningservices', cleaningServiceRoutes);
app.use('/api/users',userroutes)
app.use('/api/userdata', userdataroutes)
app.use('/api/quote',quoteroute)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;

app.listen(port , () => console.log(`Server is running at ${port}`));